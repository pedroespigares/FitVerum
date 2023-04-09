import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAppointmentComponent } from './trainer-appointment.component';

describe('TrainerAppointmentComponent', () => {
  let component: TrainerAppointmentComponent;
  let fixture: ComponentFixture<TrainerAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
