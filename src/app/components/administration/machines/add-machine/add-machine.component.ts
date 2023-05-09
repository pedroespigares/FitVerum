import { Component } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';

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
  maxSize: number = 3145728;
  fileTooBig: boolean = false;

  constructor(private database: DatabaseService, private router: Router, private toasts: ToastsService) {
    this.storage = getStorage();
    this.toasts.machineAdded = false;
  }

   /**
    * Subir imagen a Firebase Storage
    * @param event
    */
   uploadFile(event: any) {
    const file = event.target.files[0];
    if (file.size > this.maxSize) {
      this.fileTooBig = true;
      return;
    }
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
    this.toasts.machineAdded = true;
    this.router.navigate(['/administration/machines']);
  }
}
