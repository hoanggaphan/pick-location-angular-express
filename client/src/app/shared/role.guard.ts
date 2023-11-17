import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export default class RoleGuard {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate() {
    if (this.authService.haveAccess()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
