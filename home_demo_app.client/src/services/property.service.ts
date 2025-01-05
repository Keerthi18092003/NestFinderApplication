import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://13.61.64.165:5000/api/AddProperty'; 
  constructor(private http: HttpClient) { }

  
  getProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/view`);
  }
  addProperty(property: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add`, property); 
  }
  // Update an existing property
  updateProperty(propertyId: string, propDetails: any): Observable<any> {
    console.log(propertyId);
    console.log(propDetails);
    return this.http.put(`${this.apiUrl}/edit/${propertyId}`, propDetails);
  }

  // Fetch a single property by ID (for editing)
  getPropertyById(propertyId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/edit/${propertyId}`); 
  }
  deleteProperty(propertyId: string): Observable<void> {
    console.log(propertyId);
    return this.http.delete<void>(`${this.apiUrl}/delete/${propertyId}`).pipe(
      catchError((error) => {
        console.error('Error deleting property:', error);
        throw error; 
      })
    );
  }
  getFilteredProperties(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/filter?type=${type}`);
  }
  getUserProperties(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/view/${userId}`);
  }
  
}

