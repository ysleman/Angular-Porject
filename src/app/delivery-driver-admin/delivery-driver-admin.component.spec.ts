import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDriverAdminComponent } from './delivery-driver-admin.component';

describe('DeliveryDriverAdminComponent', () => {
  let component: DeliveryDriverAdminComponent;
  let fixture: ComponentFixture<DeliveryDriverAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryDriverAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryDriverAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
