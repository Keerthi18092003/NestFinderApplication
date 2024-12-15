import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { ChangeDetectorRef } from '@angular/core';
import { OwnerComponent } from '../owner/owner.component';
import { OwnerLayoutComponent } from '../layout/owner-layout/owner-layout.component';



@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, ReactiveFormsModule, CommonModule],
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
    private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef) {
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

    const propertyId = this.route.snapshot.paramMap.get('propertyId'); // Extract propertyId from the route
    console.log('Extracted Property ID:', propertyId);
    if (propertyId) {
      this.getEditData(propertyId); // Pass the dynamic propertyId to fetch data
    }
  }


  get images(): FormArray {
    return this.addListingForm.get('images') as FormArray;
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      // Loop through the selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.convertFileToBase64(file).then(base64 => {
          // Add the base64 image string to the form array
          this.images.push(this.fb.control(base64));
          // Add the image to the preview list
          this.selectedImages.push(base64);
        })
      }
    }
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // Resolve with base64 string
      reader.onerror = reject; // Reject if there's an error
      reader.readAsDataURL(file); // Read the file as a base64-encoded string
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
    this.propertyService.addProperty(propDetails).subscribe({
      next: () => {
        alert('Property added successfully!');
        this.addListingForm.reset();
        this.router.navigate(['/view-listing']);
      },
      error: (err) => {
        console.error(err);
        alert(`Adding property failed: ${err.message}`);
      }
    });
  }

  updateProperty(propDetails: any) {
    // Use the property ID from the route or another source
    const propertyId = this.route.snapshot.paramMap.get('propertyId'); // Retrieve from route parameters

    if (!propertyId) {
      console.error('Property ID is missing.');
      alert('Failed to update property: Property ID is required.');
      return;
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
              this.images.push(this.fb.control(image)); 
              this.selectedImages.push(image); 
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
