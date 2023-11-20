import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { SubmissionPaginationRow } from '../../models/Submission';
import SubmissionService from '../../services/submission.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    MatProgressSpinnerModule,
  ],
})
export class DashboardComponent implements AfterViewInit {
  columnsToDisplay: string[] = [
    'id',
    'user',
    'longitude',
    'latitude',
    'created',
  ];
  resultsLength = 0;
  limit = 10;
  isLoadingResults = true;
  isRateLimitReached = false;
  _router = inject(Router);
  _submissionService = inject(SubmissionService);
  data: SubmissionPaginationRow[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  detail(id: number) {
    this._router.navigate([`/admin/submission/${id.toString()}`]);
  }

  ngAfterViewInit() {
    this.paginator.pageSize = this.limit;
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._submissionService
            .getAll({
              page: this.paginator.pageIndex + 1,
              limit: this.limit,
            })
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.pagination.totalRows;
          return data.rows;
        })
      )
      .subscribe((data) => (this.data = data));
  }
}
