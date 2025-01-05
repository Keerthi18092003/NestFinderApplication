import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { ChangeDetectorRef } from '@angular/core';
import { OwnerComponent } from '../owner/owner.component';
import { OwnerLayoutComponent } from '../../layout/owner-layout/owner-layout.component';
import { LoginSessionService } from '../../../services/loginsession.service';



@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent {

  propertyId!: any;
  isEditMode: boolean = false;
  formTitle: string = 'Add Property';
  submitButtonLabel: string = 'Submit';
  selectedImages: string[] = [];

  addListingForm!: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private propertyService: PropertyService,
    private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef,private loginService:LoginSessionService) {
    this.addListingForm = this.fb.group({
      propertyType: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      price: new FormControl('', { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
      street: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      city: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      pincode: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]{6}$')], nonNullable: true }),
      description: new FormControl('', { validators: [Validators.required, Validators.minLength(10)], nonNullable: true }),
      rentalTerms: new FormControl(''),
      bedrooms: new FormControl('', { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
      rooms: new FormControl('', { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
      area: new FormControl('', { validators: [Validators.required, Validators.min(100)], nonNullable: true }),
      furnished: new FormControl('No', { validators: [Validators.required], nonNullable: true }),
      mobileNumber: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]{10}$')], nonNullable: true }),
      images: this.fb.array([], Validators.required)
    });

    const propertyId = this.route.snapshot.paramMap.get('propertyId'); 
    console.log('Extracted Property ID:', propertyId);
    if (propertyId) {
      this.getEditData(propertyId); 
    }
  }


  get images(): FormArray {
    return this.addListingForm.get('images') as FormArray;
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.convertFileToBase64(file).then(base64 => {
         
          this.images.push(this.fb.control(base64));
         
          this.selectedImages.push(base64);
        })
      }
    }
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); 
      reader.onerror = reject;
      reader.readAsDataURL(file); 
    });
  }

  

  onFormSubmit() {
    if (this.addListingForm.valid) {
      const propDetails = this.addListingForm.value;

      if (this.isEditMode) {
       
        this.updateProperty(propDetails);
      } else {
        this.addProperty(propDetails);
      }
    } else {
      alert('Please fix the errors in the form before submitting.');
    }
  }

  addProperty(propDetails: any) {
    const id = this.loginService.getUserId();
    console.log('Retrieved User ID:', id);
    if (!id) {
      alert('User not logged in!');
      return;
    }
    const requestBody = { ...propDetails, id };
    console.log('Request body being sent:', requestBody);
    console.log('Property details to be added:', propDetails);
    this.propertyService.addProperty(requestBody).subscribe({
      next: (response) => {
        if (response.propertyId) {
          alert(`Property added successfully! Property ID: ${response.propertyId}`);
          this.addListingForm.reset();  
          this.router.navigate(['/view-listing']); 
        } else {
          alert('Property added successfully, but no propertyId received.');
        }
      },
      error: (err) => {
        console.error(err);
        const errorMessage = err?.message || 'An error occurred while adding the property.';
        alert(`Adding property failed: ${errorMessage}`);
      }
    });
  }

  updateProperty(propDetails: any) {
    
    const propertyId = this.route.snapshot.paramMap.get('propertyId'); 

    if (!propertyId) {
      console.error('Property ID is missing.');
      alert('Failed to update property: Property ID is required.');
      return;
    }
    if (!propDetails.images || propDetails.images.length === 0) {
      // If no new images, send the existing images as part of the update
      propDetails.images = this.selectedImages; // Retain the previous images
    }

   
    console.log('Sending data to update property:', propDetails);

    this.propertyService.updateProperty(propertyId, propDetails).subscribe({
      next: () => {
        alert('Property updated successfully!');
        this.addListingForm.reset();
        this.isEditMode = false; // Reset mode after successful update
        this.router.navigate(['/view-listing']);
      }
      
    });
  }


  getEditData(propertyId: string) {
    this.propertyService.getPropertyById(propertyId).subscribe({
      next: (data: any) => {
        console.log('Fetched property data:', data);
        if (data) {
          this.addListingForm.patchValue({
            propertyType: data.propertyType,
            price: data.price,
            street: data.street,
            city: data.city,
            pincode: data.pincode,
            description: data.description,
            rentalTerms: data.rentalTerms || '',
            bedrooms: data.bedrooms,
            rooms: data.rooms,
            area: data.area,
            furnished: data.furnished,
            mobileNumber: data.mobileNumber
          });
          this.images.clear();
          if (data.images && Array.isArray(data.images)) {
            data.images.forEach((image: string) => {
              const fullImageUrl = `http://localhost:5043/${image}`;
              this.images.push(this.fb.control(fullImageUrl));
              this.selectedImages.push(fullImageUrl); 
            });
          }
          this.isEditMode = true;
          this.formTitle = 'Edit Property';
          this.submitButtonLabel = 'Update';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching property data:', err);
        alert('Failed to fetch property data');
      }
    });
  }
}
