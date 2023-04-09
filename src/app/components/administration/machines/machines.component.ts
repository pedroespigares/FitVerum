import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})

export class MachinesComponent {
  machines: any[];
  storage: any;

  constructor(private database: DatabaseService) { 
    this.storage = getStorage();
  }

  ngOnInit(): void {
    this.database.getMachines().subscribe((machines: any) => {
      this.machines = machines;
    });
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
