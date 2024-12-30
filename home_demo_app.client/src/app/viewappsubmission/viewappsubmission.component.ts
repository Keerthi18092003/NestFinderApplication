import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppsubmissionService } from '../../services/appsubmission.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private appsubmissionService: AppsubmissionService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    if (this.propertyId) {
      this.loadApplications();
    }
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
          https://www.nestfinder.com/tenant/dashboard

          Thank you,
          NestFinder Team
        `
        };

        // Send the email
        this.http.post('https://localhost:7261/api/Email/send', emailPayload).subscribe({
          next: () => {
            alert('Email sent to tenant successfully.');
          },
          error: (err) => {
            console.error('Failed to send email:', err);
            alert('Failed to send email. Please try again later.');
          }
        });

        
      },
      error: (err) => {
        alert('Failed to accept application: ' + err.error);
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
