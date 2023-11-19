import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { SubmissionSubmitReq } from '../models/SubmissionSubmitReq';

@Injectable({
  providedIn: 'root',
})
export default class SubmissionService {
  _httpClient = inject(HttpClient);

  submit(submission: SubmissionSubmitReq) {
    return this._httpClient.post(
      `${environment.apiUrl}/submission/submit`,
      submission
    );
  }
}
