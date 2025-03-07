import {Component, input} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {checkmarkDoneOutline} from "ionicons/icons";
import {Chat} from "../../interfaces/chat";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  imports: [
    IonicModule,
    DatePipe
  ],
  standalone: true
})
export class ChatBoxComponent {
  chat = input<Chat | null>(null);

  constructor() {
    addIcons({
      checkmarkDoneOutline
    })
  }

}
