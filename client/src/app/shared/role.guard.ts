import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import AuthService from '../services/auth.service';

const RoleGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (_authService.haveAccess()) {
    return true;
  } else {
    _router.navigate(['']);
    return false;
  }
};

export default RoleGuard;
