import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonAlert,
  IonButton,
  IonContent, IonFooter, IonHeader,
  IonIcon,
  IonInput,
  IonInputPasswordToggle, IonList, IonModal, IonRouterLink, IonSpinner, IonText, IonTitle,
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
  imports: [IonContent, IonInput, ReactiveFormsModule, IonIcon, IonInputPasswordToggle, IonList, IonButton, IonSpinner, IonText, IonRouterLink, RouterLink, IonFooter, IonToolbar, IonAlert, IonModal, IonHeader, IonTitle]
})
export class LoginPage implements OnInit {

  form!: FormType;
  forgotPasswordEmail!: FormControl<string>
  isLogin = signal<boolean>(false);
  isForgot = signal<boolean>(false);
  isOpenModal = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  forgotPasswordMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isOpenModal.set(false);
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
      this.errorMessage.set('Failed to log in, try again');
    } finally {
      this.isLogin.set(false);
      this.form.reset()
    }
  }

  openModalForgotPassword() {
    this.forgotPasswordEmail = new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email]}
    );
    this.isOpenModal.set(true)
  }

  onForgotSubmit() {
    if (this.forgotPasswordEmail.invalid) {
      this.forgotPasswordEmail.markAllAsTouched();
      return;
    }

    this.resetPassword(this.forgotPasswordEmail.value).then();
  }

  async resetPassword(email: string) {
    try {
      this.isForgot.set(true);
      await this.authService.resetPassword(email);
      this.forgotPasswordMessage.set('Reset password link sent to your email id success!')
    } catch (e) {
      console.log(e);
    } finally {
      this.isForgot.set(false);
      this.isOpenModal.set(false);
    }
  }
}
