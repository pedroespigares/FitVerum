import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trainer-routine-card',
  templateUrl: './trainer-routine-card.component.html',
  styleUrls: ['./trainer-routine-card.component.scss']
})
export class TrainerRoutineCardComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  storage: any;
  modalData: {
    routine: any;
  };

  @Input() routine: any;
  @Output() deleteRoutineEvent = new EventEmitter();

  constructor(private database: DatabaseService, private modalService: NgbModal) {
    this.storage = getStorage();
  }

  /**
   * Borrar máquina de la base de datos
   * @param id
   * @param photoURL
   * @returns
   */
  deleteRoutine(id: string, photoURL: string): void {
    this.database.delete('routines', id);
    this.deletePhotoFromStorage(photoURL);
    this.deleteRoutineEvent.emit();
    this.modalService.dismissAll();
  }

  /**
   * Borrar foto de la máquina de Firebase Storage
   * @param photoURL
   * @returns
   * */
  deletePhotoFromStorage(photoURL: string): void {
    const photoRef = ref(this.storage, photoURL);
    deleteObject(photoRef);
  }

  open(routine: any) {
		this.modalData = { routine };
    this.modalService.open(this.modalContent, { size: 'md', centered: true, keyboard: true});
	}
}
