import { AfterViewInit, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Location } from '../../models/Location';
import LocationService from '../../services/location.service';
import SubmissionService from '../../services/submission.service';

@Component({
  selector: 'app-submission-details',
  standalone: true,
  templateUrl: './submission-details.component.html',
  imports: [MatTableModule, MatProgressSpinnerModule, MatSelectModule],
})
export class SubmissionDetailsComponent implements AfterViewInit {
  _route = inject(ActivatedRoute);
  _submissionService = inject(SubmissionService);
  _locationService = inject(LocationService);
  id = Number(this._route.snapshot.params['id']);
  columnsToDisplay: string[] = [
    'id',
    'name',
    'address',
    'longitude',
    'latitude',
    'types',
    'status',
  ];
  data: Location[] = [];
  isLoadingResults = true;

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  ngAfterViewInit() {
    this.isLoadingResults = true;

    this._submissionService
      .getById(this.id)
      .pipe(
        catchError(() => of(null)),
        map((data) => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          return data.Locations;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  onStatusChange(event: MatSelectChange, id: string) {
    const selectedStatus = event.value;
    this._locationService.updateStatus(id, selectedStatus).subscribe({
      next: (data) => {
        this._locationService.emitUpdateLocation(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
