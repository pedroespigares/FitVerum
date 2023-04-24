import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleExerciseCardComponent } from './simple-exercise-card.component';

describe('SimpleExerciseCardComponent', () => {
  let component: SimpleExerciseCardComponent;
  let fixture: ComponentFixture<SimpleExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleExerciseCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
