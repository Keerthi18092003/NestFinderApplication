import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-getusers',
  standalone: false,
  templateUrl: './getusers.component.html',
  styleUrl: './getusers.component.css'
})
export class GetusersComponent implements OnInit {

  users: any[] = [];  // Array to hold user data
  loading: boolean = true;  // Flag to manage loading state

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();  // Load users when the component initializes
  }

  // Method to fetch users from the backend API
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;  // Store the fetched data in the users array
        this.loading = false;  // Set loading to false once data is received
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;  // Set loading to false even if there is an error
      }
    });
  }

  suspendUser(userId: string): void {
    this.userService.suspendUser(userId).subscribe({
      next: () => {
        // Update the suspended status in the local array
        this.users = this.users.map(user =>
          user.id === userId ? { ...user, isSuspended: true } : user
        );
        console.log(this.users);
        alert('User suspended successfully.');
      },
      error: (err) => {
        console.error('Error suspending user:', err);
        alert('An error occurred while suspending the user.');
      }
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== userId);
          alert('User deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('An error occurred while deleting the user.');
        }
      });
    }
  }


}
