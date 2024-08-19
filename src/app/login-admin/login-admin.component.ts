import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  credentials = { username: '',password: '',admin:'' };

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      const response = await (await this.authService.loginAdmin(this.credentials));
      console.log('Login successful!', response);

      // Redirect to dashboard or another route upon successful login
      this.router.navigate(['/admin']);
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
    }
  }
}



