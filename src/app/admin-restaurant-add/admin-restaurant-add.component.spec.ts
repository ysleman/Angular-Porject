import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantAddComponent } from './admin-restaurant-add.component';

describe('AdminRestaurantAddComponent', () => {
  let component: AdminRestaurantAddComponent;
  let fixture: ComponentFixture<AdminRestaurantAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRestaurantAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
