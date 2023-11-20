export interface SubmissionSubmitReq {
  userId: number;
  lat: number;
  lng: number;
}

export interface SubmissionPaginationRow {
  id: number;
  userId: number;
  username: number;
  longitude: number;
  latitude: number;
  createdAt: string;
  updatedAt: string;
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
