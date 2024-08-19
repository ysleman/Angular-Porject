import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEditMenuComponent } from './restaurant-edit-menu.component';

describe('RestaurantEditMenuComponent', () => {
  let component: RestaurantEditMenuComponent;
  let fixture: ComponentFixture<RestaurantEditMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantEditMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
