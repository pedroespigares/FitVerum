import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';

@Component({
  selector: 'app-machine-card',
  templateUrl: './machine-card.component.html',
  styleUrls: ['./machine-card.component.scss']
})
export class MachineCardComponent {

  storage: any;

  @Input() machine: any;
  @Output() deleteMachineEvent = new EventEmitter();

  constructor(private database: DatabaseService) {
    this.storage = getStorage();
  }

  /**
   * Borrar máquina de la base de datos
   * @param id
   * @param photoURL
   * @returns
   */
  deleteMachine(id: string, photoURL: string): void {
    let confirmDelete = confirm('Are you sure you want to delete this machine?');
    if (confirmDelete){
      this.database.delete('machines', id);
      this.deletePhotoFromStorage(photoURL);
      this.deleteMachineEvent.emit();
    } else {
      return;
    }
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
}
