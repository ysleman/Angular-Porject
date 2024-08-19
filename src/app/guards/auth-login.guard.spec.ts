import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthLoginGuard } from './auth-login.guard';
import { AuthService } from '../services/auth.service';

describe('AuthLoginGuard', () => {
  let guard: AuthLoginGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthLoginGuard, AuthService]
    });
    guard = TestBed.inject(AuthLoginGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    
    expect(canActivate).toEqual(true);
  });

  it('should block activation and navigate to home if user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');

    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    
    expect(canActivate).toEqual(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/']); // Adjust if navigation path differs
  });
});
