import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoutineExercisesSimpleComponent } from './user-routine-exercises-simple.component';

describe('UserRoutineExercisesSimpleComponent', () => {
  let component: UserRoutineExercisesSimpleComponent;
  let fixture: ComponentFixture<UserRoutineExercisesSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoutineExercisesSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoutineExercisesSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
