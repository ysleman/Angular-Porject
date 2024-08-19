import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditDriversComponent } from './admin-edit-drivers.component';

describe('AdminEditDriversComponent', () => {
  let component: AdminEditDriversComponent;
  let fixture: ComponentFixture<AdminEditDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditDriversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
