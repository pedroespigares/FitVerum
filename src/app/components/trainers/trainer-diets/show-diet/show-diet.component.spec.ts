import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDietComponent } from './show-diet.component';

describe('ShowDietComponent', () => {
  let component: ShowDietComponent;
  let fixture: ComponentFixture<ShowDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
