import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppsubmissionService {
  private apiUrl = 'https://localhost:7261/api/Application'; 

  constructor(private http: HttpClient) { }

  submitApplication(applicationData: any): Observable<any> {
    return this.http.post(this.apiUrl, applicationData);
  }
  getApplications(propertyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Applications/${propertyId}`);
  }
  acceptApplication(applicationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Applications/${applicationId}/Accept`, {});
  }
  rejectApplication(applicationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Applications/${applicationId}/Reject`, {});
  }
}
