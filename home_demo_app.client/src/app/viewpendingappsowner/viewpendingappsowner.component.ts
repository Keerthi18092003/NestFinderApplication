import { Component } from '@angular/core';
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
  constructor(private appsubmissionService: AppsubmissionService, private loginService: LoginSessionService) { }

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
    this.appsubmissionService.acceptApplication(applicationId).subscribe(
      () => {
        alert('Application accepted!');
        this.loadPendingApplications();
      },
      (error) => {
        alert('Failed to accept application: ' + error.error);
      }
    );
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
