import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoutinesComponent } from './user-routines.component';

describe('UserRoutinesComponent', () => {
  let component: UserRoutinesComponent;
  let fixture: ComponentFixture<UserRoutinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoutinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
