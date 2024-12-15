import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private propertyService: PropertyService) { }
  ngOnInit(): void {
    this.loadProperties();
  }
  onSearch() {
    if (this.searchQuery) {
      this.router.navigate(['/find-properties'], { queryParams: { search: this.searchQuery } });
    }
  }
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
}
