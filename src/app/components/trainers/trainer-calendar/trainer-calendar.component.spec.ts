import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCalendarComponent } from './trainer-calendar.component';

describe('TrainerCalendarComponent', () => {
  let component: TrainerCalendarComponent;
  let fixture: ComponentFixture<TrainerCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
