import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-restaurant',
  templateUrl: './login-restaurant.component.html',
  styleUrl: './login-restaurant.component.css'
})
export class LoginRestaurantComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      const response = await (await this.authService.loginRestaurant(this.credentials));
      console.log('Login successful!', response);

      // Redirect to dashboard or another route upon successful login
      this.router.navigate(['/restaurant_admin']);
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
    }
  }
}
