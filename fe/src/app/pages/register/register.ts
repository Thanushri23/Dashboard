import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['../login/login.css', './register.css'],
})
export class RegisterComponent {

  data = {
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 'employee'
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.data).subscribe({
      next: () => {
        alert("Registered successfully");
        this.router.navigate(['/login']);
      },
       error: (err: any) => {
        console.error(err);
      },
    });
  }
}