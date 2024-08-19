import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDriversAddComponent } from './admin-drivers-add.component';

describe('AdminDriversAddComponent', () => {
  let component: AdminDriversAddComponent;
  let fixture: ComponentFixture<AdminDriversAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDriversAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDriversAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
