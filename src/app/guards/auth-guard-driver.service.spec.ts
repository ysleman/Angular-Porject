import { TestBed } from '@angular/core/testing';

import { AuthGuardDriverService } from './auth-guard-driver.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuardDriverService', () => {
  let guard: AuthGuardDriverService;
  let authServiceStub: Partial<AuthService>;

  beforeEach(() => {
    authServiceStub = {
      checkAuthenticationRequest: () => of(true) // Replace with your mock as needed
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuardDriverService,
        { provide: AuthService, useValue: authServiceStub }
      ]
    });
    guard = TestBed.inject(AuthGuardDriverService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
