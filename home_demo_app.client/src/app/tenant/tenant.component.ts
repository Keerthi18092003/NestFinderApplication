import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PropertyService } from '../../services/property.service';


@Component({
  selector: 'app-tenant',
  standalone: false,

  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.css'
})
export class TenantComponent {
  properties: any[] = [];
  errorMessage: string = '';
  searchQuery: string = '';
  filteredProperties: any[] = [];
  filterType: string = '';
  wishlist: any[] = [];
  constructor(private router: Router, private propertyService: PropertyService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.filterType = params.get('filterType') || '';

      if (this.filterType) {
        this.loadFilteredProperties(this.filterType);
      } else {
        this.loadProperties();
      }
    });
  }
  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();

    if (query) {
      // Filter properties by matching street or city
      this.filteredProperties = this.properties.filter(property =>
        property.street.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.propertyType.toLowerCase().includes(query)
      );
    } else {
      // Reset to show all properties when searchQuery is empty
      this.filteredProperties = [...this.properties];
    }
    
  }
  loadProperties(): void {
    this.propertyService.getProperties().subscribe(
      (data) => {
        this.properties = data;
        this.filteredProperties = [...this.properties];
        console.log('Properties:', this.properties);
      },
      (error) => {
        this.errorMessage = 'Error fetching property listings.';
        console.error(error);
      }
    );
  }
  loadFilteredProperties(type: string): void {
    this.propertyService.getFilteredProperties(type).subscribe(
      (data) => {
        this.filteredProperties = data;
      },
      (error) => {
        console.error('Error fetching filtered properties:', error);
      }
    );
  }
  toggleWishlist(property: any): void {
    if (this.isInWishlist(property)) {
      this.wishlist = this.wishlist.filter(item => item.propertyId !== property.propertyId); // Remove from wishlist
    } else {
      this.wishlist.push(property); // Add to wishlist
    }
  }

  // Check if a property is in the wishlist
  isInWishlist(property: any): boolean {
    return this.wishlist.some(item => item.propertyId === property.propertyId);
  }
}
