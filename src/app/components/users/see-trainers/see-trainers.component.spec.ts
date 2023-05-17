import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTrainersComponent } from './see-trainers.component';

describe('SeeTrainersComponent', () => {
  let component: SeeTrainersComponent;
  let fixture: ComponentFixture<SeeTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeTrainersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
