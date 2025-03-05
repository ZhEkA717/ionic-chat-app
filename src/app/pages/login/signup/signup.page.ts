import {Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonAlert,
  IonBackButton,
  IonButton, IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput, IonInputPasswordToggle, IonList, IonSpinner, IonText,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {lockClosedOutline, mailOutline, personOutline} from "ionicons/icons";
import {AuthService} from "../../../services/auth/auth.service";

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
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonInput, IonInputPasswordToggle, IonList, IonSpinner, IonText, ReactiveFormsModule, IonButtons, IonBackButton, IonAlert]
})
export class SignupPage implements OnInit {
  form!: FormType;
  isSignUp = signal<boolean>(false);
  errorMessage = signal<string | null>(null)

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
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

    const {name, email, password} = this.form.value;

    this.signup({
      name: name as string,
      email: email as string,
      password: password as string
    }).then()
  }

  async signup(formValue: {name: string, email: string, password: string}) {
    try {
      this.isSignUp.set(true);
      const { id } = await this.authService.register(formValue);
      console.log(id);
      this.router.navigate(['/tabs']).then()
    } catch (e: any) {
      let msg = 'Could not sign you up. please try again'
      if(e.code === 'auth/email-already-in-use') {
        msg = 'Email already in use';
      }
      this.errorMessage.set(msg);
    } finally {
      this.isSignUp.set(false);
      this.form.reset();
    }
  }
}
