import { TestBed } from '@angular/core/testing';

import { AuthGuardRestaurantService } from './auth-guard-restaurant.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
describe('AuthGuardRestaurantService', () => {
  let guard: AuthGuardRestaurantService;
  let authServiceStub: Partial<AuthService>;

  beforeEach(() => {
    authServiceStub = {
      checkAuthenticationRequest: () => of(true) // Replace with your mock as needed
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuardRestaurantService,
        { provide: AuthService, useValue: authServiceStub }
      ]
    });
    guard = TestBed.inject(AuthGuardRestaurantService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
