import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { GooglemapService } from '../../services/googlemap.service';

@Component({
  selector: 'app-map-submission',
  standalone: true,
  templateUrl: './map-submission.component.html',
  imports: [GoogleMapsModule, CommonModule, MatButtonModule, MatIconModule],
})
export class MapSubmissionComponent implements OnInit {
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  marker: google.maps.LatLngLiteral | null = null;
  markerOptions: google.maps.MarkerOptions = {};
  _snackBar = inject(MatSnackBar);
  googleMapService = inject(GooglemapService);
  apiLoaded$: Observable<boolean> = this.googleMapService.apiLoaded$;

  ngOnInit() {
    this.apiLoaded$.subscribe((apiLoaded) => {
      if (apiLoaded) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
        this.markerOptions = {
          animation: google.maps.Animation.BOUNCE,
        };
      }
    });
    this.googleMapService.loadApi();
  }

  pickMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.marker = event.latLng.toJSON();
    }
  }

  submit() {
    if (!this.marker) {
      this._snackBar.open('Please pick 1 location!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: 'alert-type-fill-error',
      });
      return;
    }

    console.log(this.marker);
  }
}
