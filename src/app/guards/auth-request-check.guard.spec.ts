import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuardWithRequestCheck } from './auth-request-check.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuardWithRequestCheck', () => {
  let guard: AuthGuardWithRequestCheck;
  let authServiceStub: Partial<AuthService>;

  beforeEach(() => {
    authServiceStub = {
      checkAuthenticationRequest: () => of(true) // Replace with your mock as needed
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuardWithRequestCheck,
        { provide: AuthService, useValue: authServiceStub }
      ]
    });
    guard = TestBed.inject(AuthGuardWithRequestCheck);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Add more test cases as needed
});
