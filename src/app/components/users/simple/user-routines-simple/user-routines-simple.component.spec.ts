import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoutinesSimpleComponent } from './user-routines-simple.component';

describe('UserRoutinesSimpleComponent', () => {
  let component: UserRoutinesSimpleComponent;
  let fixture: ComponentFixture<UserRoutinesSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoutinesSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoutinesSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
