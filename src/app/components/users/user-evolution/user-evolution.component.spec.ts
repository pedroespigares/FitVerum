import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEvolutionComponent } from './user-evolution.component';

describe('UserEvolutionComponent', () => {
  let component: UserEvolutionComponent;
  let fixture: ComponentFixture<UserEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEvolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
