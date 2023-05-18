import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss']
})
export class ExerciseCardComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() exercise: any;
  modalData: {
    exercise: any;
  };
  machinePhotoURL: string;

  constructor(private database: DatabaseService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.database.getMachinePhoto(this.exercise.machineID).then((photoURL) => {
      this.machinePhotoURL = photoURL;
    });
  }

  /**
   * Borrar máquina de la base de datos
   * @param id
   * @param photoURL
   * @returns
   */
  deleteExercise(id: string): void {
    this.database.delete('exercises', id);
  }

  open(exercise: any) {
		this.modalData = { exercise };
    this.modalService.open(this.modalContent, { size: 'md', centered: true, keyboard: true});
	}
}
