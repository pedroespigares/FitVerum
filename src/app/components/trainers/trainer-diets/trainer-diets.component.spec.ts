import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDietsComponent } from './trainer-diets.component';

describe('TrainerDietsComponent', () => {
  let component: TrainerDietsComponent;
  let fixture: ComponentFixture<TrainerDietsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerDietsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
