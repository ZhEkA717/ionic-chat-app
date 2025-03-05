import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs,} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  callOutline,
  chatbubbleOutline,
  chatbubblesOutline,
  cogOutline,
  chatbubble,
  call,
  chatbubbles,
  cog
} from "ionicons/icons";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPage {

  public selectedTab = signal<string>('chat');

  constructor() {
    addIcons({
      chatbubbleOutline,
      cogOutline,
      callOutline,
      chatbubblesOutline,
      chatbubble,
      call,
      chatbubbles,
      cog
    })
  }

  getSelected(event: { tab: string }) {
    this.selectedTab.set(event.tab);
  }
}
