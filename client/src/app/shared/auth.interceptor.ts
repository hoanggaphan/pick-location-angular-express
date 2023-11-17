import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import AuthService from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService);
  const isLogged = _authService.isLogged();

  if (isLogged) {
    const user = JSON.parse(_authService.getUser());
    const accessToken = user.accessToken;
    const newReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + accessToken),
    });
    return next(newReq);
  } else {
    return next(req);
  }
};
