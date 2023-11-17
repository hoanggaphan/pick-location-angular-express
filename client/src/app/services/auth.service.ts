import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginReq } from '../models/LoginReq';
import { Router } from '@angular/router';
import { RegisterReq } from '../models/RegisterReq';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  _httpClient = inject(HttpClient);
  _router = inject(Router);

  login(user: LoginReq) {
    return this._httpClient.post(`${environment.apiUrl}/auth/login`, user);
  }

  register(user: RegisterReq) {
    return this._httpClient.post(`${environment.apiUrl}/auth/register`, user);
  }

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

  isLogged() {
    return localStorage.getItem('user') != null;
  }

  getUser() {
    return localStorage.getItem('user') ?? '';
  }

  haveAccess() {
    const userLocal = localStorage.getItem('user') ?? '';
    const loggintoken = JSON.parse(userLocal).accessToken;
    const extractedtoken = loggintoken.split('.')[1];
    const atobdata = atob(extractedtoken);
    const finaldata = JSON.parse(atobdata);
    if (finaldata.role == 'admin') {
      return true;
    } else {
      alert('you not having access');
      return false;
    }
  }
}
