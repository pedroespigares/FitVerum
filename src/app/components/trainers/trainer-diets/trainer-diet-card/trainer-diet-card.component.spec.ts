import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDietCardComponent } from './trainer-diet-card.component';

describe('TrainerDietCardComponent', () => {
  let component: TrainerDietCardComponent;
  let fixture: ComponentFixture<TrainerDietCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerDietCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerDietCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
