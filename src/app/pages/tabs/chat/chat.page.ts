import {Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList]
})
export class ChatPage implements OnInit{
  name = signal<string | null>(null);

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.setChatName();
  }

  setChatName() {
    const data = this.activatedRoute.snapshot.queryParams as { name?: string};
    if(data?.name) {
      this.name.set(data.name)
    }
  }

}
