import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Location } from '../../models/Location';
import AuthService from '../../services/auth.service';
import { GooglemapService } from '../../services/googlemap.service';
import LocationService from '../../services/location.service';
import SubmissionService from '../../services/submission.service';

@Component({
  selector: 'app-map-submission',
  standalone: true,
  templateUrl: './map-submission.component.html',
  imports: [GoogleMapsModule, CommonModule, MatButtonModule, MatIconModule],
})
export class MapSubmissionComponent implements OnInit {
  _snackBar = inject(MatSnackBar);
  _googleMapService = inject(GooglemapService);
  _submissionService = inject(SubmissionService);
  _authService = inject(AuthService);
  _locationService = inject(LocationService);
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  zoom = 15;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    scrollwheel: false,
    disableDoubleClickZoom: true,
  };
  marker: google.maps.LatLngLiteral | null = null;
  markerOptions: google.maps.MarkerOptions = {};
  markersApproved: any[] = [];
  apiLoaded$: Observable<boolean> = this._googleMapService.apiLoaded$;
  user = JSON.parse(this._authService.getUser());
  iconStyle = {
    fontFamily: 'Material Icons',
    color: '#ffffff',
    fontSize: '18px',
  };
  icons: Icons = {
    base: '../assets/default-marker.png',
    school: '../assets/school.png',
    hospital: '../assets/hospital.png',
    park: '../assets/park.png',
    supermarket: '../assets/supermarket.png',
  };
  typesToCheck = ['school', 'hospital', 'park', 'supermarket'];
  infoContent = '';

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
    this._googleMapService.loadApi();

    this._locationService
      .getAll({ status: 'approve', userId: this.user.id })
      .subscribe({
        next: (data) => {
          if (data) {
            this.markersApproved = data.map((m) => this.formatedMarker(m));
          }
        },
        error: (err) => {
          console.error(err);
        },
      });

    this._locationService.onResponseUpdateLocation().subscribe({
      next: (location) => {
        if (location.status === 'approve') {
          this.markersApproved.push(
            this.formatedMarker(location, {
              animation: google.maps.Animation.DROP,
            })
          );
        } else {
          this.markersApproved = this.markersApproved.filter(
            (m) => location.id !== m.id
          );
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  formatedMarker(location: Location, options?: google.maps.MarkerOptions) {
    let icon = this.icons['base'];
    location.types.forEach((type) => {
      if (this.typesToCheck.includes(type)) {
        icon = this.icons[type];
      }
    });

    return {
      id: location.id,
      position: {
        lat: location.latitude,
        lng: location.longitude,
      },
      options: {
        ...options,
        title: location.name,
        icon,
      },
      content: `<h5>${location.name}</h5><p>${location.address}</p>`,
    };
  }

  openInfoWindow(marker: MapMarker, content: string) {
    if (this.infoWindow != undefined) {
      this.infoContent = content;
      this.infoWindow.open(marker);
    }
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
    const location = { userId: this.user.id, ...this.marker };

    this._submissionService.submit(location).subscribe({
      next: (res) => {
        this.marker = null;

        this._snackBar.open('Submit location successfully!', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'alert-type-fill-success',
        });
      },
      error: (error) => {
        this._snackBar.open(error.error.message, 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'alert-type-fill-error',
        });
      },
    });
  }
}

interface Icons {
  [key: string]: string;
}
