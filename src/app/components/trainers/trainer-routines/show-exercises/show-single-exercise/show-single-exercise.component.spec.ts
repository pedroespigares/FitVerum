import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleExerciseComponent } from './show-single-exercise.component';

describe('ShowSingleExerciseComponent', () => {
  let component: ShowSingleExerciseComponent;
  let fixture: ComponentFixture<ShowSingleExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSingleExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSingleExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
