import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEditOrderComponent } from './restaurant-edit-order.component';

describe('RestaurantEditOrderComponent', () => {
  let component: RestaurantEditOrderComponent;
  let fixture: ComponentFixture<RestaurantEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantEditOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
