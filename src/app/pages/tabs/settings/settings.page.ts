import { Component } from '@angular/core';
import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel]
})
export class SettingsPage {

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout().then()
  }

}
