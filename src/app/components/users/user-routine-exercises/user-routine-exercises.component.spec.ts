import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoutineExercisesComponent } from './user-routine-exercises.component';

describe('UserRoutineExercisesComponent', () => {
  let component: UserRoutineExercisesComponent;
  let fixture: ComponentFixture<UserRoutineExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoutineExercisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoutineExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
