export interface Location {
  id: number;
  placeId: string;
  name: string;
  longitude: number;
  latitude: number;
  address: string;
  types: string[];
  status: string;
  area?: number;
  createdAt: string;
  updatedAt: string;
  submissionId: number;
}
