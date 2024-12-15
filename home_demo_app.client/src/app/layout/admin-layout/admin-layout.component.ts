import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  constructor(private router: Router) { }
  viewUsers(): void {
    this.router.navigate(['/getusers']);
  }

  suspendAccount(): void {
    this.router.navigate(['/suspendedusers']);
  }

  // Property Management methods
  viewProperties(): void {
    this.router.navigate(['/viewlistingadmin']);
  }

  removeProperty(): void {
    console.log('Remove Fraudulent Listings button clicked');

  }

  // Application Oversight methods
  trackApplications(): void {
    console.log('Track Applications button clicked');

  }

  resolveDispute(): void {
    console.log('Resolve Disputes button clicked');

  }

  // Communication and Support methods
  openHelpDesk(): void {
    console.log('Open Help Desk button clicked');
  }

  sendMessage(): void {
    console.log('Send Message button clicked');

  }

}
