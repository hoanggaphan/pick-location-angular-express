import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LocationSubmitReq } from '../models/LocationSubmitReq';

@Injectable({
  providedIn: 'root',
})
export default class LocationService {
  _httpClient = inject(HttpClient);

  submit(location: LocationSubmitReq) {
    return this._httpClient.post(
      `${environment.apiUrl}/location/submit`,
      location
    );
  }
}
