import { Component, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';

@Component({
  selector: 'app-trainer-routine-card',
  templateUrl: './trainer-routine-card.component.html',
  styleUrls: ['./trainer-routine-card.component.scss']
})
export class TrainerRoutineCardComponent {
  storage: any;

  @Input() routine: any;

  constructor(private database: DatabaseService) {
    this.storage = getStorage();
  }

  /**
   * Borrar máquina de la base de datos
   * @param id
   * @param photoURL
   * @returns
   */
  deleteRoutine(id: string, photoURL: string): void {
    let confirmDelete = confirm('Are you sure you want to delete this machine?');
    if (confirmDelete){
      this.database.deleteRoutine(id);
      this.deletePhotoFromStorage(photoURL);
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
