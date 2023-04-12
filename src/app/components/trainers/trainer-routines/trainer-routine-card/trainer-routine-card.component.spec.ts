import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerRoutineCardComponent } from './trainer-routine-card.component';

describe('TrainerRoutineCardComponent', () => {
  let component: TrainerRoutineCardComponent;
  let fixture: ComponentFixture<TrainerRoutineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerRoutineCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerRoutineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
