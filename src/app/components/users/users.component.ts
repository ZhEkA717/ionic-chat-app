import { Component, input, OnInit, output } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonImg, IonItem, IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import { arrowBack } from 'ionicons/icons';
import {User} from "../../interfaces/user";

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
    IonLabel
  ],
  standalone: true
})
export class UsersComponent {
  users = input<User[] | null>(null);
  // eslint-disable-next-line @angular-eslint/no-output-native
  close = output<boolean>()
  user = output<User>()

  constructor() {
    addIcons({
      arrowBack
    })
  }

  startChat(user: User) {
    this.user.emit(user);
  }
}
