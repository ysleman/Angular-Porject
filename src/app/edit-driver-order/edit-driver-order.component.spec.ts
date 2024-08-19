import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriverOrderComponent } from './edit-driver-order.component';

describe('EditDriverOrderComponent', () => {
  let component: EditDriverOrderComponent;
  let fixture: ComponentFixture<EditDriverOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDriverOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDriverOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
