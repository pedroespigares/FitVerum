import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMachineComponent } from './update-machine.component';

describe('UpdateMachineComponent', () => {
  let component: UpdateMachineComponent;
  let fixture: ComponentFixture<UpdateMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
