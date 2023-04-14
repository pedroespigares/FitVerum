import { Component } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.scss']
})
export class AddRoutineComponent {
  basePath: string = 'routines';
  title: string = '';
  uploaded: boolean = false;
  photoURL: string = '';
  storage: any;
  uploadMessage: string = 'Choose Image';
  userID: string


  constructor(
    private database: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService) {
    this.storage = getStorage();
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID');
   }

   /**
    * Subir imagen a Firebase Storage
    * @param event
    */
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

  addRoutine(){
    this.database.addRoutine(this.title, this.photoURL, this.userID, this.auth.userID);
    this.router.navigate(['/trainer/routines']);
  }
}
