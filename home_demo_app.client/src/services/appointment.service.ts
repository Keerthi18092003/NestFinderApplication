// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7261/api/OnsiteAppointment'; 

  constructor(private http: HttpClient) { }

  bookAppointment(appointmentRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book-appointment`, appointmentRequest);
  }


  getAppointmentsByProperty(propertyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/property/${propertyId}`);
  }

  getAppointmentsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteCompletedAppointments(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-completed-appointments`);
  }
}


