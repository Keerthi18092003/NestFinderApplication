import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppsubmissionService } from '../../../services/appsubmission.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-viewappsubmission',
  standalone: false,
  
  templateUrl: './viewappsubmission.component.html',
  styleUrl: './viewappsubmission.component.css'
})
export class ViewappsubmissionComponent {
  propertyId: string | null = null;
  applications: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  users: any[] = [];  

  constructor(private appsubmissionService: AppsubmissionService, private route: ActivatedRoute, private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    if (this.propertyId) {
      this.loadApplications();
      this.loadUsers();
    }
  }

  loadUsers(): void {
    // Fetch all users
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.isLoading = false;
      }
    });
  }

  // Load applications for the property
  loadApplications(): void {
    this.appsubmissionService.getApplications(this.propertyId!).subscribe(
      (data) => {
        this.applications = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load applications.';
        console.error(error);
      }
    );
  }

  // Accept an application
  acceptApplication(applicationId: string): void {
    // Find the application by applicationId
    console.log(applicationId);
    console.log('Applications Array:', this.applications);
    const application = this.applications.find(app => app.applicationId === applicationId);
    console.log(application);
    if (!application) {
      alert('Application not found!');
      return;
    }

    const userId = application.id;
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      alert('User not found!');
      return;
    }

    // Send the request to accept the application in the backend
    this.appsubmissionService.acceptApplication(applicationId).subscribe({
      next: (response: any) => {
        alert('Application accepted!');

        // Prepare the email payload
        const emailPayload = {
          to: user.email,
          subject: '🎉 Your Application Has Been Accepted! 🎉',
          body: `
  Hi ${user.name},

  Great news! 🎉 We’re thrilled to let you know that your application for the property has been successfully accepted.

  You’re now one step closer to moving into your dream home! 🏡 

  To review your application details and next steps, please log in to your NestFinder account:
  [NestFinder Login](http://13.61.164.211/login)

  If you have any questions, feel free to reach out to our support team. We're here to help!

  Thank you for choosing NestFinder. We’re excited to be part of your journey! 💛

  Warm regards,  
  The NestFinder Team  
  `
        };

        // Send email
        this.http.post('https://localhost:7261/api/Email/send', emailPayload).subscribe({
          next: () => {
            alert('Application accepted and email sent successfully!');
          },
          error: (err) => {
            console.error('Failed to send email:', err);
            alert('Failed to send email. Please try again later.');
          }
        });
      },
      error: (err) => {
        console.error('Failed to accept application:', err);
        alert('Failed to accept application. Please try again later.');
      }
    });
  }


  // Reject an application
  rejectApplication(applicationId: string): void {
    this.appsubmissionService.rejectApplication(applicationId).subscribe(
      () => {
        alert('Application rejected successfully!');
        this.loadApplications(); // Refresh applications list
      },
      (error) => {
        console.error(error);
        alert('Failed to reject application.');
      }
    );
  }
}
