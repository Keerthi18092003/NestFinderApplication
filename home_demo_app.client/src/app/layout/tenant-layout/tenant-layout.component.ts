import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSessionService } from '../../../services/loginsession.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-tenant-layout',
  standalone: false,
  templateUrl: './tenant-layout.component.html',
  styleUrl: './tenant-layout.component.css'
})
export class TenantLayoutComponent {
  userId: string | null;

  constructor(private loginSessionService: LoginSessionService, private userService: UserService) {
    this.userId = this.loginSessionService.getUserId();
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.loginSessionService.logout();
    }
  }

  removeAccount(): void {
    if (this.userId && confirm('Are you sure you want to remove your account? This cannot be undone.')) {
      this.userService.deleteUser(this.userId).subscribe(
        (response) => {
          alert('Account removed successfully.');
          this.loginSessionService.logout();
        },
        (error) => {
          alert(error.error?.message || 'Failed to remove account.');
        }
      );
    }
  }

}
