import { Component } from '@angular/core';
import { LoginSessionService } from '../../../services/loginsession.service';
import { AppsubmissionService } from '../../../services/appsubmission.service';
import { AppointmentService } from '../../../services/appointment.service';

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
  appointmentModalOpen: boolean = false;
  preferredDateTime: string = '';
  propertyId: string = '';  
  mobileNumber: string = '';
  userId: string = '';
  appointmentBooked = false;
  selectedApplication: any | null = null;


  constructor(
    private appsubmissionService: AppsubmissionService,
    private loginService: LoginSessionService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.fetchAcceptedApplications();
    const retrievedUserId = this.loginService.getUserId();
    if (!retrievedUserId) {
      alert('User not logged in!');
      return;
    }
    this.userId = retrievedUserId; 
    console.log('Logged-in User ID:', this.userId);
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

    const phoneLink = `tel:${formattedNumber}`;
    window.location.href = phoneLink;
  }

  openAppointmentModal(application: any): void {
    // Open modal and set the selected property data
    this.appointmentModalOpen = true;
    this.selectedApplication = application; // Store the selected application
    this.propertyId = application.propertyId; // Assign selected propertyId
    this.mobileNumber = ''; 
  }

  // Close the appointment modal
  closeAppointmentModal(): void {
    this.appointmentModalOpen = false;
    this.selectedApplication = null; // Clear the selected application
  }

  // Submit the appointment form
  submitAppointmentForm(): void {
    if (!this.mobileNumber || !this.preferredDateTime || !this.propertyId) {
      alert('Please fill out all fields!');
      return;
    }

    const localDate = new Date(this.preferredDateTime);
    const offset = localDate.getTimezoneOffset(); // Timezone offset in minutes
    localDate.setMinutes(localDate.getMinutes() - offset);

    // Prepare the data to be sent to the backend
    const appointmentData = {
      propertyId: this.propertyId, // Use the selected propertyId
      preferredDate: localDate.toISOString(),
      mobileNumber: this.mobileNumber,
      id: this.userId
    };

    console.log('Appointment Data:', appointmentData);

    // Call the bookAppointment method in the AppointmentService
    this.appointmentService.bookAppointment(appointmentData).subscribe({
      next: (response) => {
        console.log('Appointment booked:', response);
        alert('Appointment booked successfully!');

        // Set appointmentBooked flag for the selected application
        if (this.selectedApplication) {
          this.selectedApplication.appointmentBooked = true;
        }

        this.closeAppointmentModal();
      },
      error: (err) => {
        console.error('Error booking appointment:', err);
        alert('Failed to book the appointment. Please try again later.');
      },
    });
  }


  formatGoogleCalendarDate(date: string): string {
    const startDate = new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(new Date(date).getTime() + 60 * 60 * 1000) // +1 hour
      .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return `${startDate}/${endDate}`;
  }

  generateGoogleCalendarLink(application: any): string {
    if (!application || !application.property) {
      console.error('Invalid application or property data.');
      return '';
    }
    console.log('generateGoogleCalendarLink triggered!');
    const text = encodeURIComponent('Property Appointment');
    const details = encodeURIComponent('Visit the property at your scheduled time.');
    const location = encodeURIComponent(
      `${this.selectedProperty.street}, ${this.selectedProperty.city}`
    );
    const dates = this.formatGoogleCalendarDate(this.preferredDateTime);
    console.log('Generated calendar link:', text, details, location, dates);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  }

}
