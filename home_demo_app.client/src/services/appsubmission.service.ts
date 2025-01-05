import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppsubmissionService {
  private apiUrl = 'http://13.61.64.165:5000/api/Application';

  constructor(private http: HttpClient) { }

  submitApplication(applicationData: any): Observable<any> {
    return this.http.post(this.apiUrl, applicationData);
  }
  getUserApplications(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/view/applications?userId=${userId}`);
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
  getAcceptedApplications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/accepted/${userId}`);
  }
  getPendingApplications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/pending?userId=${userId}`);
  }
  getPendingApplicationsOwner(ownerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/pending/owner?ownerId=${ownerId}`);
  }
  getAcceptedApplicationsOwner(ownerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/accepted/owner?ownerId=${ownerId}`);
  }

  getAdminApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/viewapplications/admin`);
  }

  deleteApplication(applicationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/applications/delete/${applicationId}`);
  }
}
