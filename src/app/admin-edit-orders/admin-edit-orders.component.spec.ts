import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditOrdersComponent } from './admin-edit-orders.component';

describe('AdminEditOrdersComponent', () => {
  let component: AdminEditOrdersComponent;
  let fixture: ComponentFixture<AdminEditOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
