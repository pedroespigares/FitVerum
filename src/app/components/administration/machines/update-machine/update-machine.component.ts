import { Component, onInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@angular/fire/storage';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements onInit {

  basePath = '/machines';
  machine: any;
  name: string;
  description: string;
  newImage: string;
  uploadMessage: string = 'Choose Image';
  machineUploaded: boolean = false;
  uploaded: boolean = false;
  previousPhotoURL: string;
  newPhotoURL: string;
  storage: any;

  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) { 
    this.storage = getStorage();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getMachineByID(id).then((machine) => {
      this.machine = machine;
      this.machineUploaded = true;
      this.name = this.machine.name;
      this.description = this.machine.description;
      this.previousPhotoURL = this.machine.photoURL;
    });
  }
    
  uploadFile(event: any) {
    const file = event.target.files[0];
    const storageRef = ref(this.storage, `${this.basePath}/${file.name}`);
    uploadBytes(storageRef, file).then(() => {
      this.uploaded = true;
      this.uploadMessage = 'Image Uploaded';
      getDownloadURL(storageRef).then((url) => {
        this.newPhotoURL = url;
        this.previousPhotoURL = null;
      });
    });
  }

  deletePhotoFromStorage(photoURL: string): void {
    const photoRef = ref(this.storage, photoURL);
    deleteObject(photoRef);
  }

  updateMachine(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(this.previousPhotoURL == null) {
      this.database.updateMachine(id, this.name, this.description, this.newPhotoURL);
      this.deletePhotoFromStorage(this.previousPhotoURL);
    } else {
      this.database.updateMachine(id, this.name, this.description, this.previousPhotoURL);
    }
    this.router.navigate(['/administration/machines']);
  }
    
}
