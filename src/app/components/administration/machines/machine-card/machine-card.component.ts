import { Component, Input } from '@angular/core';
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

  constructor(private database: DatabaseService) {
    this.storage = getStorage();
  }

  deleteMachine(id: string, photoURL: string): void {
    let confirmDelete = confirm('Are you sure you want to delete this machine?');
    if (confirmDelete){
      this.database.deleteMachine(id);
      this.deletePhotoFromStorage(photoURL);
    } else {
      return;
    }
  }

  deletePhotoFromStorage(photoURL: string): void {
    const photoRef = ref(this.storage, photoURL);
    deleteObject(photoRef);
  }
}
