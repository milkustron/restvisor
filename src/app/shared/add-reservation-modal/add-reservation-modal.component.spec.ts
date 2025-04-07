import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationModalComponent } from './add-reservation-modal.component';

describe('AddReservationModalComponent', () => {
  let component: AddReservationModalComponent;
  let fixture: ComponentFixture<AddReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReservationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
