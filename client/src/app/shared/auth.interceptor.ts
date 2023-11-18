import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import AuthService from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService);
  const isLogged = _authService.isLogged();

  if (isLogged) {
    const user = JSON.parse(_authService.getUser());
    const accessToken = user.accessToken;
    const refreshToken = user.refreshToken;
    const newReq = addTokenheader(accessToken);

    return next(newReq).pipe(
      catchError((errorData) => {
        if (
          errorData.status === 401 &&
          errorData.error.message === 'Refresh token expired'
        ) {
          errorData.error.message = 'Login session was expired';
          _authService.logout();
          return throwError(() => errorData);
        }

        if (
          errorData.status === 401 &&
          errorData.error.message === 'Access token expired'
        ) {
          return handleRefrehToken(refreshToken);
        }

        return throwError(() => errorData);
      })
    );
  } else {
    return next(req);
  }

  function handleRefrehToken(refreshToken: string) {
    return _authService.refreshToken(refreshToken).pipe(
      switchMap((data: any) => {
        _authService.saveNewToken(data.accessToken);
        return next(addTokenheader(data.accessToken));
      }),
      catchError((errodata) => {
        _authService.logout();
        return throwError(() => errodata);
      })
    );
  }

  function addTokenheader(token: string) {
    return req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token),
    });
  }
};
