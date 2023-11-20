import { Location } from './Location';

export interface SubmissionSubmitReq {
  userId: number;
  lat: number;
  lng: number;
}

export interface Submission {
  id: number;
  userId: number;
  longitude: number;
  latitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionPaginationRow extends Submission {
  username: number;
}

export interface SubmissionPagination {
  rows: SubmissionPaginationRow[];
  pagination: {
    limit: number;
    page: number;
    totalPages: number;
    totalRows: number;
  };
}

export interface SubmissionDetail extends Submission {
  Locations: Location[];
}
