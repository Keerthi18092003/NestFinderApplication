import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router, private propertyService: PropertyService, private userService: UserService) { }
  
  userCount: number = 0;
  propertyCount: number = 0;

  ngOnInit(): void {
    this.getUsers();
    this.getProperties();
  }

 
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.userCount = users.length; 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Call the service method to get properties
  getProperties(): void {
    this.propertyService.getProperties().subscribe(
      (properties) => {
        this.propertyCount = properties.length; 
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

}
