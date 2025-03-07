import {computed, Injectable, signal} from '@angular/core';
import {ApiService} from "../api/api.service";
import {onValue, query} from "@angular/fire/database";
import {Chat} from "../../interfaces/chat";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUserId = computed(() => this.authService.uid());
  chatMessages = signal<Chat[] | null>([])
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.authService.getId();
  }

  async sendMessage(chatRoomId: string, message: string) {
    try {
      const chatRoomRef = this.apiService.getRef(`chatrooms/${chatRoomId}/messages`);
      const chatData: Chat = {
        senderId: this.currentUserId() as string,
        message,
        timestamp: Date.now(),
      };
      // push the new message to the chatroom's messages node

      const  newMessageRef = this.apiService.pushData(chatRoomRef);
      await this.apiService.setRefData(newMessageRef, chatData);
    } catch (e) {
      throw e;
    }
  }

  getChatMessages(chatRoomId: string) {
    const chatRoomRef = this.apiService.getRef(`chatrooms/${chatRoomId}/messages`);

    // listen for realtime updates to the chat messages within the chatroom
    onValue(chatRoomRef, (snapshot) => {
      if(snapshot?.exists()) {
        const messages = snapshot.val();
        const messagesArray: Chat[] = Object.keys(messages).map(messageId => ({
          id: messageId,
          ...messages[messageId],
          isCurrentUser: messages[messageId].senderId === this.currentUserId()
        }))
        this.chatMessages.set(messagesArray);
      } else {
        this.chatMessages.set([]);
      }
    }, (error) => {
        console.log(error);
      }
    )
  }
}
