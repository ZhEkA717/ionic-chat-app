import {Injectable, OnInit, signal} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid = signal<string | null>(null)

  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ) {}


  setData(uid: string | null) {
    if(!this.uid())
      this.uid.set(uid);
  }

  getId() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid || null;
    this.setData(uid);
    return uid;
  }

  async register(data:{name: string, email: string, password: string}):Promise<{id: string}> {
    try {
      const register = await createUserWithEmailAndPassword(
        this.fireAuth,
        data.email,
        data.password
      )
      const uid = register.user.uid;
      const userDataDto = {
        uid,
        name: data.name,
        email: data.email,
        photo: 'https://i.pravatar.cc/' + this.randomIntFromInterval(200, 400)
      }

      await this.apiService.setData(`users/${uid}`, userDataDto);
      this.setData(uid);

      return { id: uid }
    } catch (e) {
      throw e;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(
        this.fireAuth,
        email,
        password
      );
      if(response?.user) {
        this.setData(response.user.uid);
      }
    } catch (e) {
      throw e;
    }
  }

  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
