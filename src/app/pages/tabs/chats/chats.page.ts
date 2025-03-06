import {Component, computed, signal} from '@angular/core';
import {
  IonAvatar, IonButton, IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonImg,
  IonItem, IonLabel,
  IonList, IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  addCircle
} from "ionicons/icons";
import {UsersComponent} from "../../../components/users/users.component";
import {ChatRoomService} from "../../../services/chat-room/chat-room.service";
import {User} from "../../../interfaces/user";
import {NavigationExtras, Router} from "@angular/router";
import {ChatRoom} from "../../../interfaces/chat-room";
import {EmptyScreenComponent} from "../../../components/empty-screen/empty-screen.component";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonButton, IonButtons, IonIcon, IonModal, UsersComponent, EmptyScreenComponent]
})
export class ChatsPage {
  isNewChat = signal<boolean>(false)
  users = computed<User[] | null>(() => this.chatRoomService.users());
  chatRooms = computed<ChatRoom[] | null>(() => this.chatRoomService.chatRooms());

  model = {
    icon: 'chatbubbles-outline',
    title: "No Chat Rooms",
    color: 'danger'
  }
  constructor(
    private chatRoomService: ChatRoomService,
    private router: Router
  ) {
    addIcons({
      addCircle
    })
  }

  openChatModal() {
    this.chatRoomService.getUsers()
    this.isNewChat.set(true)
  }

  async startChat(user: User, modal: IonModal) {
    try {
      const room = await this.chatRoomService.createChatRoom([user.uid], user.name);
      //dismiss modal
      modal.dismiss().then();
      //navigate to chat page
      const navData: NavigationExtras = {
        queryParams: {
          name: user.name
        }
      }
      this.router.navigate(['/tabs/chats', room.id], navData).then()
    } catch (e) {
      throw e;
    }
  }

  goToChat(roomId: string) {
    this.router.navigate(['/tabs/chats', roomId]).then()
  }
}
