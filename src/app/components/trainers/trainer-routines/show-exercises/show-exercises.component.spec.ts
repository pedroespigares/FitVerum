import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExercisesComponent } from './show-exercises.component';

describe('ShowExercisesComponent', () => {
  let component: ShowExercisesComponent;
  let fixture: ComponentFixture<ShowExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowExercisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
