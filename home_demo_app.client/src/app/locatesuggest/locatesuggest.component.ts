import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-locatesuggest',
  standalone: false,
  templateUrl: './locatesuggest.component.html',
  styleUrls: ['./locatesuggest.component.css']
})
export class LocatesuggestComponent implements OnInit {
  userLocation: { lat: number; lng: number } | null = null;
  nearbyProperties: any[] = [];
  filteredProperties: any[] = [];

  constructor(
    private propertyService: PropertyService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUserLocation();
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getProperties().subscribe(
      (properties) => {
        this.filteredProperties = properties;
        this.getCoordinatesForProperties(this.filteredProperties);
        this.getNearbyProperties();
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  // Get user location via geolocation
  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('User Location:', this.userLocation);
          this.getNearbyProperties();
        },
        (error) => {
          console.error('Error fetching location', error);
          if (error.code === error.PERMISSION_DENIED) {
            alert('Permission to access location was denied.');
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert('Location information is unavailable.');
          } else if (error.code === error.TIMEOUT) {
            alert('The request to get your location timed out.');
          } else {
            alert('An unknown error occurred while fetching location.');
          }
        },
        { timeout: 10000 }  // Timeout after 10 seconds if location not retrieved
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  }


  // Fetch latitude and longitude for each property based on its address (street, city)
  getCoordinatesForProperties(properties: any[]): void {
    properties.forEach((property) => {
      const address = `${property.street}, ${property.city}`;
      console.log(address);
      this.getCoordinates(address).subscribe((coordinates) => {
        property.latitude = coordinates.lat;
        property.longitude = coordinates.lon;
        this.getNearbyProperties(); // Recalculate nearby properties when coordinates are set
      });
    });
  }

  // Use Nominatim API to get latitude and longitude based on street and city
  getCoordinates(address: string): Observable<any> {
    const params = new HttpParams()
      .set('q', address)
      .set('format', 'json')
      .set('limit', '1');

    const url = 'https://nominatim.openstreetmap.org/search';
    return this.http.get<any[]>(url, { params }).pipe(
      map((response) => {
        console.log("Geolocation:",response);
        if (response && response.length > 0) {
          const lat = parseFloat(response[0].lat);
          const lon = parseFloat(response[0].lon);

          if (isNaN(lat) || isNaN(lon)) {
            throw new Error('Invalid coordinates received');
          }
          return { lat, lon };
        } else {
          throw new Error('Unable to get coordinates');

        }

      })
    );
  }

  // Filter properties that are within 10 km of the user's location
  getNearbyProperties(): void {
    if (!this.userLocation) return;
    console.log('Filtering properties based on user location:', this.userLocation);
    this.nearbyProperties = this.filteredProperties.filter((property) => {
      const distance = this.calculateDistance(
        this.userLocation!.lat,
        this.userLocation!.lng,
        property.latitude,
        property.longitude
      );
      return distance <= 100;
    });
  }

  // Calculate distance between two coordinates (Haversine formula)
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    console.log(`lat1: ${lat1}, lng1: ${lng1}, lat2: ${lat2}, lng2: ${lng2}`);
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLng = this.degreesToRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
      Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    console.log('Calculated distance:', distance);
    return distance;
  }

  // Convert degrees to radians
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
