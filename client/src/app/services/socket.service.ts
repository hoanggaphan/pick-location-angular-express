import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import AuthService from './auth.service';

@Injectable({
  providedIn: 'root',
})
export default class SocketService {
  _authService = inject(AuthService);
  user = JSON.parse(this._authService.getUser());
  socket = io(environment.serverUrl, {
    query: {
      userId: this.user.id,
    },
    withCredentials: true,
  });

  emit<T>(event: string, data: T): void {
    this.socket.emit(event, data);
  }

  on<T>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
      });

      return () => this.socket.off(event);
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
