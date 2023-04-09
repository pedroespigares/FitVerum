import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerModificationComponent } from './trainer-modification.component';

describe('TrainerModificationComponent', () => {
  let component: TrainerModificationComponent;
  let fixture: ComponentFixture<TrainerModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
