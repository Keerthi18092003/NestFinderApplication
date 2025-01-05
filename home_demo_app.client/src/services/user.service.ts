import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7261/api/Registration'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/view`);  // Sends a GET request to the API to fetch users
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view/${id}`);
  }

  suspendUser(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/suspend/${userId}`, { isSuspended: true });
  }
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${userId}`);
  }
  getSuspendedUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/suspendedaccounts`);
  }

  unsuspendUser(userId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/suspensionstatus/${userId}`, { isSuspended: false });
  }

}
