import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Location } from '../models/Location';
import SocketService from './socket.service';

@Injectable({
  providedIn: 'root',
})
export default class LocationService {
  _httpClient = inject(HttpClient);
  _socketService = inject(SocketService);

  updateStatus(id: string, status: string) {
    return this._httpClient.put<Location>(
      `${environment.apiUrl}/location/${id}`,
      {
        status,
      }
    );
  }

  emitUpdateLocation(location: Location) {
    this._socketService.emit('update-location', location);
  }

  onResponseUpdateLocation() {
    return this._socketService.on<Location>('response-update-location');
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
