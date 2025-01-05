import { Component } from '@angular/core';
import { PropertyService } from '../../../services/property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewlistingadmin',
  standalone: false,
  
  templateUrl: './viewlistingadmin.component.html',
  styleUrl: './viewlistingadmin.component.css'
})
export class ViewlistingadminComponent {
  properties: any[] = [];
  loading: boolean = true;

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching properties:', err);
        this.loading = false;
      }
    });
  }
  deleteProperty(propertyId: string): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(propertyId).subscribe({
        next: () => {
          this.properties = this.properties.filter(property => property.id !== propertyId);
          alert('Property deleted successfully.');
          this.fetchProperties();
        },
        error: (err) => {
          console.error('Error deleting property:', err);
          alert('An error occurred while deleting the property.');
        }
      });
    }
  }
}
