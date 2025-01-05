import { Component } from '@angular/core';
import { AppsubmissionService } from '../../../services/appsubmission.service';

@Component({
  selector: 'app-viewappsadmin',
  standalone: false,
  
  templateUrl: './viewappsadmin.component.html',
  styleUrl: './viewappsadmin.component.css'
})
export class ViewappsadminComponent {
  applications: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private applicationService: AppsubmissionService) { } // Inject the service

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationService.getAdminApplications()
      .subscribe(
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
  deleteApplication(applicationId: string): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(applicationId)
        .subscribe(
          () => {
            this.applications = this.applications.filter(app => app.ApplicationId !== applicationId);
            alert('Application deleted successfully!');
          },
          (error) => {
            this.errorMessage = 'Failed to delete application.';
          }
        );
    }
  }
}
