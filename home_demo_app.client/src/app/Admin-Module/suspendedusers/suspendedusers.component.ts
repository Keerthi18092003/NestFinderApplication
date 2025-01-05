import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-suspendedusers',
  standalone: false,
  
  templateUrl: './suspendedusers.component.html',
  styleUrl: './suspendedusers.component.css'
})
export class SuspendedusersComponent {
  suspendedUsers: any[] = [];
  loading = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadSuspendedUsers();
  }

  loadSuspendedUsers(): void {
    this.userService.getSuspendedUsers().subscribe({
      next: (data) => {
        this.suspendedUsers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching suspended accounts:', err);
        this.loading = false;
      }
    });
  }

  unsuspendUser(userId: string): void {
    this.userService.unsuspendUser(userId).subscribe({
      next: () => {
        // Remove unsuspended user from the list
        this.suspendedUsers = this.suspendedUsers.filter(suspendedUsers => suspendedUsers.id !== userId);
        alert('User unsuspended successfully.');
      },
      error: (err) => {
        console.error('Error unsuspending user:', err);
        alert('An error occurred while unsuspending the user.');
      }
    });
  }
}
