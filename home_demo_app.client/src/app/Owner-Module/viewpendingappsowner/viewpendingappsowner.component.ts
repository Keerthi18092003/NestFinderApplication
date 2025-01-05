import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppsubmissionService } from '../../../services/appsubmission.service';
import { LoginSessionService } from '../../../services/loginsession.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-viewpendingappsowner',
  standalone: false,
  
  templateUrl: './viewpendingappsowner.component.html',
  styleUrl: './viewpendingappsowner.component.css'
})
export class ViewpendingappsownerComponent {
  id: string = '';
  pendingApplications: any[] = [];
  selectedApplication: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  applications: any[] = [];
  isLoading: boolean = true;
  users: any[] = [];  
  
  constructor(private appsubmissionService: AppsubmissionService, private loginService: LoginSessionService, private http: HttpClient, private applicationService: AppsubmissionService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadPendingApplications();
    this.loadUsers();
    this.loadApplications();
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
  loadApplications(): void {
    this.applicationService.getAdminApplications().subscribe(
      (data) => {
        this.applications = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load applications.';
        this.isLoading = false;
      }
    );
  }

  loadPendingApplications(): void {
    const id = this.loginService.getUserId();
    console.log('Retrieved User ID:', id);
    if (!id) {
      alert('User not logged in!');
      return;
    }
    this.appsubmissionService.getPendingApplicationsOwner(id).subscribe(
      (data) => {
        console.log(data);
        this.pendingApplications = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to load applications.';
        this.loading = false;
      }
    );
  }

  showApplicationDetails(application: any): void {
    this.selectedApplication = application;
  }
   
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
        this.loadPendingApplications(); 

        // Prepare the email payload
        const emailPayload = {
          to: user.email,
          subject: '🎉 Your Application Has Been Accepted! 🎉',
          body: `
  Hi ${user.name},

  Great news! 🎉 We’re thrilled to let you know that your application for the property has been successfully accepted.

  You’re now one step closer to moving into your dream home! 🏡 

  To review your application details and next steps, please log in to your NestFinder account:
  [NestFinder Login](http://13.61.64.165/login)

  If you have any questions, feel free to reach out to our support team. We're here to help!

  Thank you for choosing NestFinder. We’re excited to be part of your journey! 💛

  Warm regards,  
  The NestFinder Team  
  `
        };

        // Send email
        this.http.post('http://13.61.64.165:5000/api/Email/send', emailPayload).subscribe({
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

      

  rejectApplication(applicationId: string): void {
    this.appsubmissionService.rejectApplication(applicationId).subscribe(
      () => {
        alert('Application rejected!');
        this.loadPendingApplications();
      },
      (error) => {
        alert('Failed to reject application: ' + error.error);
      }
    );
  }

}
