import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse {

  message: string; // Optional: Include other fields like 'message'
  userId: string; // Matches the property sent from your backend
}

@Injectable({
  providedIn: 'root',
})
export class LoginSessionService {

  private readonly USER_ID_KEY = 'userid';
  constructor(private router: Router) { }


  setUserId(userId: string): void {
    sessionStorage.setItem(this.USER_ID_KEY, userId);
  }

  getUserId(): string | null {
    return sessionStorage.getItem(this.USER_ID_KEY);
  }

  logout(): void {
    sessionStorage.clear(); // Clear all session storage
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
