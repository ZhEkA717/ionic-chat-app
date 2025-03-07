import {Component, computed, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonItem,
  IonList, IonSpinner, IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute} from "@angular/router";
import {ChatBoxComponent} from "../../../components/chat-box/chat-box.component";
import {EmptyScreenComponent} from "../../../components/empty-screen/empty-screen.component";
import {addIcons} from "ionicons";
import {chatbubblesOutline, send} from "ionicons/icons";
import {ChatService} from "../../../services/chat/chat.service";
import {Chat} from "../../../interfaces/chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, ChatBoxComponent, EmptyScreenComponent, IonFooter, IonTextarea, FormsModule, IonItem, IonIcon, IonButton, IonSpinner]
})
export class ChatPage implements OnInit {
  chats = signal(Array(10));
  chatsMessages = computed<Chat[] | null>(() => this.chatService.chatMessages())
  id: string | null = null;
  name = signal<string | null>(null);
  message = signal<string | null>(null)
  isLoading = signal<boolean>(false)

  model = {
    icon: 'chatbubbles-outline',
    title: "No Messages",
    color: 'danger'
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService
  ) {
    addIcons({
      chatbubblesOutline,
      send
    })
  }

  ngOnInit(): void {
    this.setChatNameAndId();
    this.chatService.getChatMessages(this.id as string)
  }

  setChatNameAndId() {
    const {params, queryParams} = this.activatedRoute.snapshot;
    if (queryParams['name']) {
      this.name.set(queryParams['name'])
    }

    if (params['id']) {
      this.id = params['id'];
    }

  }

  async sendMessage() {
    const message = this.message();
    if(!(message && message.trim())) {
        return;
    }

    try {
      this.isLoading.set(true)
      await this.chatService.sendMessage(this.id!, message);
    } catch (e) {

    } finally {
      this.isLoading.set(false)
      this.message.set('');
    }

  }
}
