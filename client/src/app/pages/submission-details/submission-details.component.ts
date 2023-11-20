import { AfterViewInit, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Location } from '../../models/Location';
import SubmissionService from '../../services/submission.service';

@Component({
  selector: 'app-submission-details',
  standalone: true,
  templateUrl: './submission-details.component.html',
  imports: [MatTableModule, MatProgressSpinnerModule],
})
export class SubmissionDetailsComponent implements AfterViewInit {
  route = inject(ActivatedRoute);
  _submissionService = inject(SubmissionService);
  id = Number(this.route.snapshot.params['id']);
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
}
