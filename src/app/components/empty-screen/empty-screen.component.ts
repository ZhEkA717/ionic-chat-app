import {Component, input} from '@angular/core';
import {IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonRow} from "@ionic/angular/standalone";

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonLabel,
    IonContent
  ],
  standalone: true
})
export class EmptyScreenComponent {
  model = input<{
    icon: string,
    color: string,
    title: string
  } | null>(null)
  constructor() { }


}
