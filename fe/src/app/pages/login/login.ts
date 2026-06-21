import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email:string = '';
  password:string = '';
  data:any;

  constructor(private auth: AuthService, private router: Router) {}
login() {
  this.data = {
    email: this.email,
    password: this.password
  };

  this.auth.login(this.data).subscribe({
    next: (res: any) => {
      // ✅ success → user exists
      this.auth.saveToken(res.token);

      if (res.user.role === 'admin' || res.user.role === 'manager') {
        this.router.navigate(['/manager']);
      } else {
        this.router.navigate(['/employee']);
      }
    },

    error: (err) => {
      console.log("ERROR:", err);

      // ✅ if user not found → go to register
      if (err.error?.msg === 'User not found') {
        this.router.navigate(['/register']);
      } 
      else {
        alert(err.error?.msg || "Login failed");
      }
    }
  });
}}