import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GooglemapService {
  private apiLoadedSubject = new BehaviorSubject<boolean>(false);
  apiLoaded$: Observable<boolean> = this.apiLoadedSubject.asObservable();
  httpClient = inject(HttpClient);

  loadApi(): void {
    if (this.apiLoadedSubject.value) {
      return;
    }

    this.httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${environment.ggApiKey}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe((apiStatus) => {
        if (apiStatus) {
          this.apiLoadedSubject.next(true);
        }
      });
  }
}
