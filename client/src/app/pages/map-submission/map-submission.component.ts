import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapInfoWindow,
} from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map-submission',
  standalone: true,
  templateUrl: './map-submission.component.html',
  styleUrl: './map-submission.component.scss',
  imports: [GoogleMapsModule, CommonModule, MatButtonModule],
})
export class MapSubmissionComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  };
  markers: any[] = [];
  infoContent = '';

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  zoomIn() {
    if (this.options.maxZoom && this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.options.minZoom && this.zoom > this.options.minZoom) this.zoom--;
  }

  click(event: google.maps.MapMouseEvent) {
    console.log({ event });
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: any, content: string) {
    this.infoContent = content;
    this.info.open(marker);
  }
}
