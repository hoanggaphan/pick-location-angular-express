import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginReq } from '../models/LoginReq';
import { RegisterReq } from '../models/RegisterReq';
import User from '../models/User';
import SocketService from './socket.service';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  _httpClient = inject(HttpClient);
  _router = inject(Router);
  _socket = inject(SocketService);

  login(user: LoginReq) {
    return this._httpClient.post<User>(
      `${environment.apiUrl}/auth/login`,
      user
    );
  }

  register(user: RegisterReq) {
    return this._httpClient.post(`${environment.apiUrl}/auth/register`, user);
  }

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/login');
    this._socket.disconnect();
  }

  isLogged() {
    return localStorage.getItem('user') != null;
  }

  getUser() {
    return localStorage.getItem('user') ?? '';
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  saveNewToken(accessToken: string): void {
    const user = JSON.parse(this.getUser());
    localStorage.setItem('user', JSON.stringify({ ...user, accessToken }));
  }

  refreshToken(refreshToken: string) {
    return this._httpClient.post(`${environment.apiUrl}/auth/refresh-token`, {
      refreshToken,
    });
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
