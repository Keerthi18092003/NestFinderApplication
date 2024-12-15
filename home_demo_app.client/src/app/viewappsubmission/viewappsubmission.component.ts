import { Component } from '@angular/core';
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
  constructor(private appsubmissionService: AppsubmissionService, private route: ActivatedRoute) { }

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
    this.appsubmissionService.acceptApplication(applicationId).subscribe(
      () => {
        alert('Application accepted successfully!');
        this.loadApplications(); // Refresh applications list
      },
      (error) => {
        console.error(error);
        alert('Failed to accept application.');
      }
    );
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
