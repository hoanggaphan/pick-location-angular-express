import { Injectable, inject } from '@angular/core';
import AuthService from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class AuthGuard {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate() {
    if (this.authService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
