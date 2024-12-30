import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppsubmissionService } from '../../services/appsubmission.service';
import { LoginSessionService } from '../../services/loginsession.service';

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
  constructor(private appsubmissionService: AppsubmissionService, private loginService: LoginSessionService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPendingApplications();
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
    this.appsubmissionService.acceptApplication(applicationId).subscribe({
      next: (response: any) => {
        alert('Application accepted!');

        // Extract details from the backend response
        const tenantName = response.tenantName;
        const tenantEmail = response.tenantEmail;
        const propertyType = response.propertyType;

        // Prepare email content
        const emailPayload = {
          to: tenantEmail,
          subject: 'Your Application Has Been Accepted',
          body: `
          Dear ${tenantName},

          Congratulations! Your application for the property '${propertyType}' has been accepted by the owner.

          Please log in to NestFinder to view your application status:
          

          Thank you,
          NestFinder Team
        `
        };

        // Send the email
        this.http.post('https://localhost:7261/api/Email/send', emailPayload).subscribe({
          next: () => {
            alert('Email sent to tenant successfully.');
          },
          error: (err:any) => {
            console.error('Failed to send email:', err);
            alert('Failed to send email. Please try again later.');
          }
        });

        // Reload pending applications
        this.loadPendingApplications();
      },
      error: (err) => {
        alert('Failed to accept application: ' + err.error);
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
