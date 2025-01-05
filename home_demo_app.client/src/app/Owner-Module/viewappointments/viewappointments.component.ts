import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-viewappointments',
  standalone: false,
  templateUrl: './viewappointments.component.html',
  styleUrls: ['./viewappointments.component.css']
})
export class ViewappointmentsComponent {
  propertyId: string = '';
  appointments: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.propertyId = params['propertyId'];
      if (this.propertyId) {
        this.fetchAppointments();
      } else {
        this.errorMessage = 'Property ID is missing!';
        this.loading = false;
      }
    });

    
    setInterval(() => {
      this.checkAndDeleteCompletedAppointments();
    }, 10000);
  }

  fetchAppointments(): void {
    this.loading = true;
    this.appointmentService.getAppointmentsByProperty(this.propertyId).subscribe({
      next: (appointments) => {
        this.appointments = appointments.map((appointment: any) => {
          
          this.userService.getUserById(appointment.id).subscribe({
            next: (user) => {
              appointment.tenantName = user.name; 
            },
            error: () => {
              appointment.tenantName = 'Unknown'; 
            }
          });
          return appointment;
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
        this.errorMessage = 'Failed to load appointments.';
        this.loading = false;
      }
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
