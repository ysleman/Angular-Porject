import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-driver',
  templateUrl: './login-driver.component.html',
  styleUrl: './login-driver.component.css'
})
export class LoginDriverComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      const response = await (await this.authService.loginDeliveryDriver(this.credentials));
      console.log('Login successful!', response);

      // Redirect to dashboard or another route upon successful login
      this.router.navigate(['/driver']);
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
    }
  }
}
