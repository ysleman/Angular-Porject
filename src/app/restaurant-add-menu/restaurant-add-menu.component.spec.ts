import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAddMenuComponent } from './restaurant-add-menu.component';

describe('RestaurantAddMenuComponent', () => {
  let component: RestaurantAddMenuComponent;
  let fixture: ComponentFixture<RestaurantAddMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantAddMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantAddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
