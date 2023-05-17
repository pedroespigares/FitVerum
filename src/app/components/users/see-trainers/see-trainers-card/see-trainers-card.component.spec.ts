import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTrainersCardComponent } from './see-trainers-card.component';

describe('SeeTrainersCardComponent', () => {
  let component: SeeTrainersCardComponent;
  let fixture: ComponentFixture<SeeTrainersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeTrainersCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeTrainersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
