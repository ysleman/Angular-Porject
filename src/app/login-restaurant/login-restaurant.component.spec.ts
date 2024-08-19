import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRestaurantComponent } from './login-restaurant.component';

describe('LoginRestaurantComponent', () => {
  let component: LoginRestaurantComponent;
  let fixture: ComponentFixture<LoginRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
