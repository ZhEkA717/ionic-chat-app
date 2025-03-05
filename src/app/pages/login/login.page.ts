import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonInputPasswordToggle, IonList, IonRouterLink, IonSpinner, IonText,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {lockClosedOutline, mailOutline} from "ionicons/icons";
import {RouterLink} from "@angular/router";

type FormType = FormGroup<{
  email: FormControl<string | null>,
  password: FormControl<string | null>
}>

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, ReactiveFormsModule, IonIcon, IonInputPasswordToggle, IonList, IonButton, IonSpinner, IonText, IonRouterLink, RouterLink, IonFooter, IonToolbar]
})
export class LoginPage implements OnInit {

  form!: FormType;
  isLogin = signal<boolean>(false);

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
}
