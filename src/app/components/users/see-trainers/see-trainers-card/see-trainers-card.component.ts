import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-see-trainers-card',
  templateUrl: './see-trainers-card.component.html',
  styleUrls: ['./see-trainers-card.component.scss']
})
export class SeeTrainersCardComponent {
  @Input() trainer: any;
  @Input() trainerIDOfActualUser: string;
  email: string;
  mailto: string;

  ngOnInit(): void {
    this.email= this.trainer.email;
    this.mailto = `mailto:${this.email}`;
  }
}
