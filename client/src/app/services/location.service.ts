import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Location } from '../models/Location';
import AuthService from './auth.service';

@Injectable({
  providedIn: 'root',
})
export default class LocationService {
  _httpClient = inject(HttpClient);
  _authService = inject(AuthService);
  user = JSON.parse(this._authService.getUser());
  socket = io(environment.serverUrl, {
    query: {
      userId: this.user.id,
    },
  });

  updateStatus(id: string, status: string) {
    return this._httpClient.put<Location>(
      `${environment.apiUrl}/location/${id}`,
      {
        status,
      }
    );
  }

  emitUpdateLocation(location: Location) {
    this.socket.emit('update-location', location);
  }

  onResponseUpdateLocation() {
    return new Observable<Location>((observer) => {
      this.socket.on('response-update-location', (location: Location) => {
        observer.next(location);
      });
    });
  }

  getAll(params?: any) {
    const { status = '', userId = '' } = params;

    const queryParams = {
      params: {
        status,
        userId,
      },
    };
    return this._httpClient.get<Location[]>(
      `${environment.apiUrl}/location`,
      queryParams
    );
  }
}
