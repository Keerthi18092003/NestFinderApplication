import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';

function emailWithMinLengthValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (email && email.includes('@')) {
    const localPart = email.split('@')[0];
    if (localPart.length < 3) {
      return { minLocalPartLength: 'Email must have at least 3 characters before "@"' };
    }
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  
  http = inject(HttpClient);
  router = inject(Router);

  termsModalOpen = false;
  
  registersForm = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern('^[A-Za-z]+$') // Only alphabets (no spaces, digits, or special characters)
      ],
      nonNullable: true
    }),

    email: new FormControl('', {
      validators: [Validators.required, Validators.email, emailWithMinLengthValidator],
      nonNullable: true

    }),
    phoneNumber: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') // Ensure it's a 10-digit number
      ],
      nonNullable: true
    }),
    gender: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    dateOfBirth: new FormControl('', {
      validators: [
        Validators.required,
        // Custom validator to check if the user is at least 16 years old
        this.ageValidator
      ],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        // Password must contain one uppercase, one lowercase, one digit, and one special character
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$')
      ],
      nonNullable: true
    }),
    confirmPassword: new FormControl('', {
      validators: [
        Validators.required,
        this.confirmPasswordValidator // Confirm password must match password
      ],
      nonNullable: true
    }),
    acceptTerms: new FormControl(false, Validators.requiredTrue)
  });

  ageValidator(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const today = new Date();

    // Ensure the date is valid
    if (isNaN(dob.getTime())) {
      return { invalidDate: 'Invalid date of birth' };
    }

    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 16) {
      return { ageError: 'User must be at least 16 years old' };
    }

    return null; // Validation passed
  }


  // Custom Validator to check if password and confirmPassword match
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    // Access the parent form group
    const parentFormGroup = control.parent as FormGroup;

    if (!parentFormGroup) {
      return null; // Return early if no parent form group is found
    }

    const password = parentFormGroup.get('password')?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: 'Passwords do not match' };
    }

    return null;
  }
  

  onFormSubmit() {
    if (this.registersForm.valid) {
      const userDetails = this.registersForm.value;

      this.http.post('https://localhost:7261/api/Registration', userDetails).subscribe({
        next: () => {
          alert('🎉 Registration successful! Welcome to NestFinder!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
            alert('An account with this email already exists. Please use a different email.');
          } else {
            console.error(err);
            alert(`Registration failed: ${err.message}`);
          }
        }
      });
    } else {
      alert('Please fix the errors in the form before submitting.');
    }
  }
  openTermsModal(): void {
    this.termsModalOpen = true;
  }

  closeTermsModal(): void {
    this.termsModalOpen = false;
  }

}
