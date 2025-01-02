import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ActivatedRoute,Router, RouterModule } from '@angular/router';
import { LoginResponse, LoginSessionService } from '../../services/loginsession.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loginError: string | null = null;
  loginSuccess: string | null = null;

  private adminEmail = 'nestfinder@gmail.com';
  private adminPassword = 'vkk@123456';
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private loginService: LoginSessionService, private route: ActivatedRoute) {
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
       this.http
         .post<any>('https://localhost:7261/api/Login', loginData)
         .subscribe({
           next: (response: any) => {
             console.log('Response of login:',response);
             if (response.userId) {
               this.loginService.setUserId(response.userId); // Set userId
               console.log('User ID set in sessionStorage:', response.userId);
             } else {
               console.error('userId is missing or undefined in the response.');
             }
             alert(`🎉 Welcome to NestFinder! We are happy to have you dear !`);
             const queryParams = this.route.snapshot.queryParams;
             const redirectTo = queryParams['redirectTo'] || '/tenant'; // Default to tenant
             const filter = queryParams['filter'] || null;

             // Redirect to the desired page with optional filter
             if (filter) {
               this.router.navigate([redirectTo], { queryParams: { filter: filter } });
             } else {
               this.router.navigate([redirectTo]);
             }
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
