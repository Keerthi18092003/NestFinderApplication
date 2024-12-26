import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginSessionService } from '../../services/loginsession.service';


@Component({
  selector: 'app-view-listing',
  standalone: false,
  templateUrl: './view-listing.component.html',
  styleUrl: './view-listing.component.css'
})
export class ViewListingComponent {
  properties: any[] = [];
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private propertyService: PropertyService, private router: Router, private http: HttpClient,private loginService:LoginSessionService) { }

  ngOnInit(): void {
    
    this.fetchUserProperties();
  }
  fetchUserProperties(): void {
    const id = this.loginService.getUserId();
    console.log('Retrieved User ID:', id);
    if (!id) {
      alert('User not logged in!');
      return;
    }
    this.propertyService.getUserProperties(id).subscribe(
      (response) => {
        this.properties = response;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to load properties.';
        this.loading = false;
      }
    );
  }

  // Fetch the list of properties from the backend
  loadProperties(): void {
    this.propertyService.getProperties().subscribe(
      (data) => {
        this.properties = data;
        console.log('Properties:', this.properties);
      },
      (error) => {
        this.errorMessage = 'Error fetching property listings.'; 
        console.error(error);
      }
    );
  }
  editProperty(property: any) {
    console.log('Editing property:', property);
    const propertyId = property; // Assuming 'id' is the unique identifier for the property
    console.log('Property ID:', propertyId);
    this.router.navigate(['/add-listing', propertyId]); 
  }
  delProperty(propertyId: string): void {
    console.log('Received property ID:', propertyId);
    if (!propertyId) {
      console.error('Property ID is undefined. Check your template.');
      return;
    }
    console.log("Deleting property with ID:", propertyId);
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(propertyId).subscribe(
        () => {
          alert('Property deleted successfully!');
          this.loadProperties(); 
        },
        (error) => {
          console.error('Error deleting property:', error);
          alert(`Failed to delete the property: ${error.message || error.statusText}`);
        }
      );
    }
  }
  viewApplications(propertyId: string): void {
    this.router.navigate(['/viewappsubmission', propertyId]);
  }
}

