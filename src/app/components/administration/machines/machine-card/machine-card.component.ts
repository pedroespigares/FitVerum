import { Component, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-machine-card',
  templateUrl: './machine-card.component.html',
  styleUrls: ['./machine-card.component.scss']
})
export class MachineCardComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  storage: any;

  @Input() machine: any;
  @Output() deleteMachineEvent = new EventEmitter();

  modalData: {
    machine: any;
  };

  constructor(private database: DatabaseService, private modalService: NgbModal) {
    this.storage = getStorage();
  }

  /**
   * Borrar máquina de la base de datos
   * @param id
   * @param photoURL
   * @returns
   */
  deleteMachine(id: string, photoURL: string): void {
    this.database.delete('machines', id);
    this.deletePhotoFromStorage(photoURL);
    this.deleteMachineEvent.emit();
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

  open(machine: any) {
		this.modalData = { machine };
    this.modalService.open(this.modalContent, { size: 'md', centered: true, keyboard: true});
	}
}
