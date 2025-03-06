import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";

export const authGuard: CanMatchFn = async () => {
  try {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = await authService.checkAuth();
    if(user) {
      return true
    }
    router.navigate(['/login']).then();
    return false;
  } catch (e) {
    throw e;
  }
};
