import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar, IonButton, IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonImg,
  IonItem, IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  addCircle
} from "ionicons/icons";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonButton, IonButtons, IonIcon]
})
export class ChatsPage {

  chats = Array(10);

  constructor() {
    addIcons({
      addCircle
    })
  }
}
