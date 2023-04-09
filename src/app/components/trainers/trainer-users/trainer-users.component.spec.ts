import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerUsersComponent } from './trainer-users.component';

describe('TrainerUsersComponent', () => {
  let component: TrainerUsersComponent;
  let fixture: ComponentFixture<TrainerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
