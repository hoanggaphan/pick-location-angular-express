import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  SubmissionDetail,
  SubmissionPagination,
  SubmissionSubmitReq,
} from '../models/Submission';

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

  getAll(params: any) {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = params;

    const queryParams = {
      params: {
        page,
        limit,
        sort,
        order,
      },
    };

    return this._httpClient.get<SubmissionPagination>(
      `${environment.apiUrl}/submission`,
      queryParams
    );
  }

  getById(id: number) {
    return this._httpClient.get<SubmissionDetail>(
      `${environment.apiUrl}/submission/${id}`
    );
  }
}
