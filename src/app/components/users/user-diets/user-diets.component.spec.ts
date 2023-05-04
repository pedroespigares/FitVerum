import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDietsComponent } from './user-diets.component';

describe('UserDietsComponent', () => {
  let component: UserDietsComponent;
  let fixture: ComponentFixture<UserDietsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDietsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
