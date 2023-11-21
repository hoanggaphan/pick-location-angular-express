import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Location } from '../models/Location';

@Injectable({
  providedIn: 'root',
})
export default class LocationService {
  _httpClient = inject(HttpClient);

  updateStatus(id: string, status: string) {
    return this._httpClient.put<Location>(`${environment.apiUrl}/location/${id}`, {
      status,
    });
  }
}
