import { Component, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';

@Component({
  selector: 'app-trainer-diet-card',
  templateUrl: './trainer-diet-card.component.html',
  styleUrls: ['./trainer-diet-card.component.scss']
})
export class TrainerDietCardComponent {
  storage: any;

  @Input() diet: any;

  constructor(private database: DatabaseService) {
    this.storage = getStorage();
  }

  /**
   * Borrar máquina de la base de datos
   * @param id
   * @param photoURL
   * @returns
   */
  deleteDiet(id: string, photoURL: string): void {
    let confirmDelete = confirm('Are you sure you want to delete this diet?');
    if (confirmDelete){
      this.database.delete('diets', id);
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
