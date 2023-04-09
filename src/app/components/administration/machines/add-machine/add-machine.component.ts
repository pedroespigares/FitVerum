import { Component } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent {
  basePath: string = 'machines';
  name: string = '';
  description: string = '';
  uploaded: boolean = false;
  photoURL: string = '';
  storage: any;
  uploadMessage: string = 'Choose Image';

  constructor(private database: DatabaseService, private router: Router) {
    this.storage = getStorage();
   }

   uploadFile(event: any) {
    const file = event.target.files[0];
    const storageRef = ref(this.storage, `${this.basePath}/${file.name}`);
    uploadBytes(storageRef, file).then(() => {
      this.uploaded = true;
      this.uploadMessage = 'Image Uploaded';
      getDownloadURL(storageRef).then((url) => {
        this.photoURL = url;
      });
    });
  }

  addMachine(){
    this.database.addMachine(this.name, this.description, this.photoURL);
    this.router.navigate(['/administration/machines']);
  }
}
