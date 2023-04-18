import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  public machineAdded: boolean = false;
  public machineEdited: boolean = false;

  public routineAdded: boolean = false;
  public routineEdited: boolean = false;
  constructor() { }
}
