import { Component } from '@angular/core';
import { AppsubmissionService } from '../../services/appsubmission.service';
import { LoginSessionService } from '../../services/loginsession.service';

@Component({
  selector: 'app-viewacceptappsowner',
  standalone: false,
  
  templateUrl: './viewacceptappsowner.component.html',
  styleUrl: './viewacceptappsowner.component.css'
})
export class ViewacceptappsownerComponent {
  acceptedApplications: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedProperty: any = null;

  constructor(private appsubmissionService: AppsubmissionService, private loginService: LoginSessionService) { }

  ngOnInit(): void {
    this.loadAcceptedApplications();
  }

  loadAcceptedApplications(): void {
    const ownerId = this.loginService.getUserId();
    console.log('Owner ID:', ownerId);
    if (!ownerId) {
      alert('User not logged in!');
      return;
    }
    this.appsubmissionService.getAcceptedApplicationsOwner(ownerId).subscribe(
      (data) => {
        console.log(data);
        this.acceptedApplications = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to load accepted applications.';
        this.isLoading = false;
      }
    );
  }

  showPropertyDetails(property: any): void {
    this.selectedProperty = property;
  }

}
