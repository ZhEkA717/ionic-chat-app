import {Component, computed, input, output} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonIcon, IonImg, IonItem, IonLabel,
  IonList, IonRow, IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {arrowBack, peopleOutline} from 'ionicons/icons';
import {User} from "../../interfaces/user";
import {ChatRoomService} from "../../services/chat-room/chat-room.service";
import {EmptyScreenComponent} from "../empty-screen/empty-screen.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    EmptyScreenComponent
  ],
  standalone: true
})
export class UsersComponent {
  users = input<User[] | null>(null);
  usersSpinner = computed<boolean>(() => this.chatRoomService.usersSpinner())
  // eslint-disable-next-line @angular-eslint/no-output-native
  close = output<boolean>()
  user = output<User>()

  model = {
    icon: 'people-outline',
    title: "No Auth Users",
    color: 'danger'
  }

  constructor(
    private chatRoomService: ChatRoomService
  ) {
    addIcons({
      arrowBack,
      peopleOutline
    })
  }

  startChat(user: User) {
    this.user.emit(user);
  }
}
