import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditResturantComponent } from './admin-edit-resturant.component';

describe('AdminEditResturantComponent', () => {
  let component: AdminEditResturantComponent;
  let fixture: ComponentFixture<AdminEditResturantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditResturantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
