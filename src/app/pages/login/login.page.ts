import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent, IonFooter,
  IonIcon,
  IonInput,
  IonInputPasswordToggle, IonList, IonRouterLink, IonSpinner, IonText,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {lockClosedOutline, mailOutline} from "ionicons/icons";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

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
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
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
    const { email, password } = this.form.value;
    this.login({
      email: email as string,
      password: password as string
    }).then()
  }

  async login({email, password}: {email: string, password: string}) {
    try {
      this.isLogin.set(true);
      await this.authService.login(email, password);
      this.router.navigate(['/tabs']).then()
    } catch (e: any) {
      let msg = 'Could not sign you up. please try again'
      if(e.code === 'auth/email-already-in-use') {
        msg = 'Email already in use';
      } else if (e.code === 'auth/wrong-password') {
        msg = 'Please enter a correct password'
      }
      this.errorMessage.set(msg);
    } finally {
      this.isLogin.set(false);
      this.form.reset();
    }
  }
}
