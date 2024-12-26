import { Component } from '@angular/core';
import { LoginSessionService } from '../../services/loginsession.service';
import { AppsubmissionService } from '../../services/appsubmission.service';

@Component({
  selector: 'app-acceptedapplications',
  standalone: false,
  
  templateUrl: './acceptedapplications.component.html',
  styleUrl: './acceptedapplications.component.css'
})
export class AcceptedapplicationsComponent {
 
  applications: any[] = []; 
  loading: boolean = true;
  errorMessage: string = '';
  selectedProperty: any = null;

  constructor(
    private appsubmissionService: AppsubmissionService,
    private loginService: LoginSessionService
  ) { }

  ngOnInit(): void {
    this.fetchAcceptedApplications();
  }

  fetchAcceptedApplications(): void {
    const id = this.loginService.getUserId();
    console.log('Retrieved User ID:', id);
    if (!id) {
      alert('User not logged in!');
      return;
    }

    this.appsubmissionService.getAcceptedApplications(id).subscribe(
      (response) => {
        console.log('Applications Data:', response);
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

  openWhatsApp(ownerName: string, ownerGender: string, propertyType: string, contactNumber: string): void {
    const salutation = ownerGender.toLowerCase() === 'male' ? 'Mr.' : 'Mrs.';
    const message = `Hi ${salutation} ${ownerName}, I hope you're doing well! I would like to connect with you regarding the property (${propertyType}) listed on NestFinder.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${contactNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }




  callOwner(contactNumber: string): void {
    let formattedNumber = contactNumber;

    // If the number doesn't already have the country code (+91), add it
    if (!formattedNumber.startsWith('+91')) {
      formattedNumber = `91${formattedNumber}`;
    }
    formattedNumber = `+91 ${formattedNumber.replace(/^91/, '')}`;

    // Now the number will have the format +91 9398336421
    const phoneLink = `tel:${formattedNumber}`;
    window.location.href = phoneLink;
  }
}
