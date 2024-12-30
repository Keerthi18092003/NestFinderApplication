import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-getusers',
  standalone: false,
  templateUrl: './getusers.component.html',
  styleUrl: './getusers.component.css'
})
export class GetusersComponent implements OnInit {

  users: any[] = [];  
  loading: boolean = true;
  message: string | null = null;

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();  
  }

  // Method to fetch users from the backend API
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;  
        this.loading = false;  
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;  
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

  WarningUser(userId: string): void {
    const user = this.users.find(u => u.id === userId);
    console.log(user);
    if (!user) {
      this.message = 'User not found!';
      return;
    }

    this.loading = true;
    this.message = null;

    
    const emailPayload = {
      to: user.email,
      subject: 'Account Warning',
      body: `Dear ${user.name},\n\nThis is a warning regarding your account. Further violations may result in suspension.\n\nThank you,\nNestFinder Team`
    };

    
    this.http.post('/api/Email/send', emailPayload)
      .subscribe({
        next: (response: any) => {
          this.message = `Warning email sent to ${user.email} successfully!`;
          this.loading = false;
        },
        error: (err) => {
          this.message = err.error.message || 'Failed to send warning email.';
          this.loading = false;
        }
      });
  }

}
