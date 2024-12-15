import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loginError: string | null = null;
  loginSuccess: string | null = null;

  private adminEmail = 'nestfinder@gmail.com';
  private adminPassword = 'vkk@123456';
   constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
     this.loginForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(8)]]
     });
   }
    ngOnInit(): void {
        
    }

   onFormSubmit(): void {
     if (this.loginForm.invalid) {
       this.loginError = 'Please fill in all fields correctly.';
       return;
     }

     const loginData = this.loginForm.value;
     console.log(loginData)

     if (
       loginData.email === this.adminEmail &&
       loginData.password === this.adminPassword
     ) {
       // If the credentials match, navigate to the AdminComponent
       this.loginError = null;
       this.loginSuccess = 'Admin login successful!';
       console.log('Admin login successful:', loginData);
       this.router.navigate(['/admin']);  // Redirect to AdminComponent
     }
     else {
       this.http.post<string>('https://localhost:7261/api/Login', loginData, { responseType: 'text' as 'json' }).subscribe({
         next: (response) => {
           this.loginError = response;
           this.loginSuccess = 'Login successful!';
           console.log('Login successful:', response);
           this.router.navigate(['/tenant']);
         },
         error: (err) => {
           if (err.status === 401) {
             this.loginError = 'Invalid email or password.';
           } else {
             this.loginError = 'An error occurred. Please try again later.';
           }
         }
       });
     }
   }
}

function error(err: any): void {
    throw new Error('Function not implemented.');
}
