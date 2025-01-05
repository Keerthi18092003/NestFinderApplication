import { Component } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { LoginSessionService } from '../../../services/loginsession.service';

@Component({
  selector: 'app-viewappointmentstenant',
  standalone: false,
  
  templateUrl: './viewappointmentstenant.component.html',
  styleUrl: './viewappointmentstenant.component.css'
})
export class ViewappointmentstenantComponent {
  appointments: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private loginSessionService: LoginSessionService
  ) { }

  ngOnInit(): void {
    this.fetchUserAppointments();
    setInterval(() => {
      this.checkAndDeleteCompletedAppointments();
    }, 10000);
  }

  fetchUserAppointments(): void {
    const userId = this.loginSessionService.getUserId(); 
    if (!userId) {
      this.errorMessage = 'User not logged in!';
      this.loading = false;
      return;
    }

    this.appointmentService.getAppointmentsByUserId(userId).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        console.log(appointments);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
        this.errorMessage = error.error?.message || 'Failed to load appointments.';
        this.loading = false;
      },
    });
  }
  checkAndDeleteCompletedAppointments(): void {
    const currentDate = new Date();
    console.log('Current Date:', currentDate);
    this.appointments.forEach((appointment, index) => {
      if (new Date(appointment.preferredDate) < currentDate) {
        this.appointments.splice(index, 1);
        this.appointmentService.deleteCompletedAppointments().subscribe({
          next: () => {
            console.log(`Deleted appointment with ID: ${appointment.appointmentId}`);
          },
          error: (error) => {
            console.error('Error deleting appointment:', error);
          }
        });
      }
    });
  }

}
