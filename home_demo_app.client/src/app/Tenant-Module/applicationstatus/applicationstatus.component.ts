import { Component } from '@angular/core';
import { LoginSessionService } from '../../../services/loginsession.service';
import { AppsubmissionService } from '../../../services/appsubmission.service';

@Component({
  selector: 'app-applicationstatus',
  standalone: false,
  
  templateUrl: './applicationstatus.component.html',
  styleUrl: './applicationstatus.component.css'
})
export class ApplicationstatusComponent {
  applications: any[] = [];
  selectedProperty: any = null;  
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private appsubmissionService: AppsubmissionService,private loginService: LoginSessionService
  ) { }
  ngOnInit(): void {
    this.fetchPendingApplications();
  }
  fetchPendingApplications(): void {
    const id = this.loginService.getUserId();
    console.log('Retrieved User ID:',id);
    if (!id) {
      alert('User not logged in!');
      return;
    }
    this.appsubmissionService.getPendingApplications(id).subscribe(
      (response) => {
        this.applications = response;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to load applications.';
        this.loading = false;
      }
    );
  }

  showPropertyDetails(property: any): void {
    this.selectedProperty = property;
  }

}
