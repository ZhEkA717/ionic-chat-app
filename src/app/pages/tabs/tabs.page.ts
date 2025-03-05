import { Component, OnInit } from '@angular/core';
import {
  IonIcon, IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {chatbubbleOutline, cogOutline, callOutline, chatbubblesOutline} from "ionicons/icons";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage implements OnInit {

  constructor() {
    addIcons({
      chatbubbleOutline,
      cogOutline,
      callOutline,
      chatbubblesOutline
    })
  }

  ngOnInit() {
  }

}
