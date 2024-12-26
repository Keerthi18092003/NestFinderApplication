import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PropertyService } from '../../services/property.service';


@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  properties: any[] = [];
  errorMessage: string = '';
  constructor(private router: Router, private propertyService: PropertyService) { }
  ngOnInit(): void {
    this.loadProperties();
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
  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  sendEmail(): void {
    window.location.href = 'mailto:nestfinderinfo@gmail.com';
  }

}
