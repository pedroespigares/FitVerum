import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss']
})
export class ExerciseCardComponent implements OnInit{
  storage: any;

  @Input() exercise: any;

  machinePhotoURL: string;

  constructor(private database: DatabaseService) {
    this.storage = getStorage();
  }

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
  deleteExercise(id: string, photoURL: string): void {
    let confirmDelete = confirm('Are you sure you want to delete this machine?');
    if (confirmDelete){
      this.database.delete('exercises', id);
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
