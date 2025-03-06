import {computed, Injectable, signal} from '@angular/core';
import {ApiService} from "../api/api.service";
import { onValue, query } from '@angular/fire/database';
import {AuthService} from "../auth/auth.service";
import {User} from "../../interfaces/user";
import {AstObject} from "@angular/compiler-cli/linker/src/ast/ast_value";

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  users = signal<User[] | null>([]);
  currentUserId = computed(() => this.authService.uid())

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

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
}
