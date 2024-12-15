import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'https://localhost:7261/api/AddProperty'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Fetch all property listings
  getProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/view`);
  }
  addProperty(property: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, property); // Endpoint for adding a new property
  }

  // Update an existing property
  updateProperty(propertyId: string, propDetails: any): Observable<any> {
    console.log(propertyId);
    console.log(propDetails);
    return this.http.put(`${this.apiUrl}/edit/${propertyId}`, propDetails);
  }

  // Fetch a single property by ID (for editing)
  getPropertyById(propertyId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/edit/${propertyId}`); // Endpoint for fetching a specific property for editing
  }
  deleteProperty(propertyId: string): Observable<void> {
    console.log(propertyId);
    return this.http.delete<void>(`${this.apiUrl}/delete/${propertyId}`).pipe(
      catchError((error) => {
        console.error('Error deleting property:', error);
        throw error; // Re-throw the error to be handled by the component
      })
    );
  }
}

