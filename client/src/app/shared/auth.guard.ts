import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import AuthService from '../services/auth.service';

const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (state.url === '/login') {
    if (_authService.isLogged()) {
      _router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }

  if (_authService.isLogged()) {
    return true;
  } else {
    _router.navigate(['login']);
    return false;
  }
};

export default AuthGuard;
