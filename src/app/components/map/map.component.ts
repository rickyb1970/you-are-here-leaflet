import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;
  map!: L.Map;
  marker!: L.Marker;

  constructor() {}

  async ngAfterViewInit() {
    try {

      const coordinates = await this.getCurrentPosition();

      L.Icon.Default.imagePath = 'assets/leaflet/images/';

      // Initialize map with dummy coordinates
      this.map = L.map(this.mapContainer.nativeElement).setView([coordinates.lat, coordinates.lng], 100);

      // Add OpenStreetMap tiles
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Get current position using Capacitor
      this.updateMapPosition(coordinates.lat, coordinates.lng);

    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  private async getCurrentPosition(): Promise<{ lat: number, lng: number }> {
    const position: Position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });

    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  }

  private updateMapPosition(lat: number, lng: number) {
    // Center the map
    this.map.setView([lat, lng], 100);

    // Remove existing marker
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Add new marker
    this.marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('You are here!')
      .openPopup();
  }
}
