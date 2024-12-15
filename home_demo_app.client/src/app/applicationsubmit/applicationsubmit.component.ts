import { Component, Inject } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppsubmissionService } from '../../services/appsubmission.service';

@Component({
  selector: 'app-applicationsubmit',
  standalone:false,
  templateUrl: './applicationsubmit.component.html',
  styleUrl: './applicationsubmit.component.css'
})
export class ApplicationsubmitComponent {
  propertyId: string | null = null;
  properties: any[] = [];
  activeApplication: string | null=null;
  applicationData = {
    tenantType: '',
    comments: '',
  };
  errorMessage: string = '';
  zoomImage: string | null = null;
 
  constructor(private propertyService: PropertyService, private router: Router, private http: HttpClient, private appsubmissionService: AppsubmissionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.loadProperties();
  }
  openImage(imageUrl: string): void {
    this.zoomImage = imageUrl; 
  }

  closeZoom(): void {
    this.zoomImage = null; 
  }
  toggleApplication(propertyId: string) {
    this.activeApplication = this.activeApplication === propertyId ? null : propertyId;
  }

  closeDialog() {
    this.activeApplication = null; 
  }
  loadProperties(): void {
    if (this.propertyId) {
      this.propertyService.getPropertyById(this.propertyId).subscribe(
        (data) => {
          this.properties = [data];
          console.log('Properties:', this.properties);
        },
        (error) => {
          this.errorMessage = 'Error fetching property listings.';
          console.error(error);
        }
      );
    }
  }
 
  submitApplication(propertyId: string): void {
    const application = {
      propertyId:propertyId,  
      tenantType: this.applicationData.tenantType,
      comments: this.applicationData.comments,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    };
    console.log('Submitting application with data:', application);
    this.appsubmissionService.submitApplication(application).subscribe(
      (response:any) => {
        alert('Application submitted successfully!');
        this.activeApplication = null;  
        this.applicationData = { tenantType: '', comments: '' }; 
      },
      (error:any) => {
        console.error('Error submitting application:', error);
        alert('Failed to submit the application. Please try again.');
      }
    );
    this.closeDialog();
  }
  resetForm(): void {
    this.applicationData = { tenantType: '', comments: '' };
  }
}



