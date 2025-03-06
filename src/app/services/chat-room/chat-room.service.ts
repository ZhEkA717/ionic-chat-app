import {computed, Injectable, signal} from '@angular/core';
import {ApiService} from "../api/api.service";
import { onValue, query } from '@angular/fire/database';
import {AuthService} from "../auth/auth.service";
import {User} from "../../interfaces/user";
import {AstObject} from "@angular/compiler-cli/linker/src/ast/ast_value";
import {ChatRoom} from "../../interfaces/chat-room";

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  users = signal<User[] | null>([]);
  chatRooms = signal<ChatRoom[] | null>([]);
  currentUserId = computed(() => this.authService.uid())

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.authService.getId();
    this.getChatRooms();
  }

  getUsers() {
    const usersRef = this.apiService.getRef('users');

    onValue(usersRef, (snapshot) => {
      if (snapshot?.exists()) {
        const users = snapshot.val();
        const usersArray: User[] = (Object.values(users) as User[])
          .filter((user) => user.uid !== this.currentUserId());
        this.users.set(usersArray);
      } else {
        this.users.set([]);
      }
    },
      (error) => {
        console.log(error);
      }
    )
  }

  async createChatRoom(userIds: string[], roomName: string, type: string = 'private'):Promise<any> {
    const chatRoomRef = this.apiService.getRef('chatrooms');
    const usersList = [this.currentUserId(), ...userIds];
    const sortedUserList = usersList.sort();
    const usersHash = sortedUserList.join(',');

    const existingChatRoomQuery = query(
      chatRoomRef,
      this.apiService.orderByChild('usersHash'), // query by users hash
      this.apiService.equalTo(usersHash)
    )

    const existingChatRoomSnapshot = await this.apiService.getData(existingChatRoomQuery);
    if (existingChatRoomSnapshot?.exists()) {
      // filter the result for a private
      const chatRooms = existingChatRoomSnapshot.val();

      // check for private chat room
      const privateChatRoom = Object.values(chatRooms).find((chatRoom: any) => chatRoom.type === 'private');
      if(privateChatRoom) {
        return privateChatRoom; // return existing private chat room if found
      }
    }

    // if no matching private chat room existing, create a new one
    const newChatRoom = this.apiService.pushData(chatRoomRef);
    const chatRoomId = newChatRoom.key;
    const chatRoomData = {
      id: chatRoomId,
      users: sortedUserList,
      usersHash,
      name: roomName,
      type,
      createdAt: new Date().toISOString()
    }

    await this.apiService.setRefData(newChatRoom, chatRoomData);
    return chatRoomData;
  }

  getChatRooms() {
    const chatRoomsRef = this.apiService.getRef('chatrooms');

    onValue(
      chatRoomsRef,
      (snapshot) => {
        if(snapshot.exists()) {
          const chatRooms = snapshot.val();

          const chatRoomKeys = Object.keys(chatRooms);
          const chatRoomData = chatRoomKeys.map((roomId) => {
            const room = chatRooms[roomId];

            // check if current user is part of the chatroom
            if (room.type === 'private' && room.users.includes(this.currentUserId())) {
              const otherUserID = room.users.find((userId: string) => userId !== this.currentUserId());

              // fetch
              return this.getOtherUserDataAndLastMessage(
                otherUserID,
                roomId,
                room,
                room.messages
              );
            }
            return null;
          })
          // execute all promises and filter out null results
          Promise.all(chatRoomData)
            .then((item) => {
            const validChatRooms = item.filter((room) => room !== null);
              this.chatRooms.set(validChatRooms)
            })

        } else {
          // no chat rooms found
        }
      }
    )
  }

   private async getOtherUserDataAndLastMessage(otherUserID: string, roomId: string, room: any, messages: any) {
    try {
      // fetch other user data
      const userRef = this.apiService.getRef((`users/${otherUserID}`));
      const snapshot = await this.apiService.getData(userRef);
      const user = snapshot.exists() ? snapshot.val() : null;
      // fetch last message from chatroom
      let lastMessage: any = null;
      if(messages) {
        const messagesArray = Object.values(messages);
        const sortedMessages = messagesArray.sort((a: any,b: any) => b.timestamp - a.timestamp);
        lastMessage = sortedMessages[0];
      }
      // lastMessage = messages ? Object.values(messages)
      //   .sort((a: any,b: any) => b.timestamp - a.timestamp) : null;

      // return structured data for the chatroom
      const roomUserData: ChatRoom = {
        roomId,
        name: user?.name || null,
        photo: user?.photo || null,
        room,
        lastMessage: lastMessage?.message || null,
        lastMessageTimestamp: lastMessage?.timestamp,
      }
      return roomUserData;
    } catch (e) {
      return null;
    }
  }
}
