import {Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonBackButton,
  IonButton, IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput, IonInputPasswordToggle, IonList, IonNavLink, IonRouterLink, IonSpinner, IonText,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {lockClosedOutline, mailOutline, personOutline} from "ionicons/icons";

type FormType = FormGroup<{
  name: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>
}>

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonInput, IonInputPasswordToggle, IonList, IonSpinner, IonText, ReactiveFormsModule, IonButtons, IonBackButton]
})
export class SignupPage implements OnInit {
  form!: FormType;
  isLogin = signal<boolean>(false);

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      personOutline
    })
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

}
