import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExercisesComponent } from './user-exercises.component';

describe('UserExercisesComponent', () => {
  let component: UserExercisesComponent;
  let fixture: ComponentFixture<UserExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExercisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
