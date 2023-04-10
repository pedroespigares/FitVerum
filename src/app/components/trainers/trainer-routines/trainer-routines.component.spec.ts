import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerRoutinesComponent } from './trainer-routines.component';

describe('TrainerRoutinesComponent', () => {
  let component: TrainerRoutinesComponent;
  let fixture: ComponentFixture<TrainerRoutinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerRoutinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerRoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
