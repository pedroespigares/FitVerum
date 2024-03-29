import { Component } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';

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
  saved: boolean = false;
  uploadMessage: string = 'Choose Image';
  userID: string;
  maxSize: number = 3145728;
  fileTooBig: boolean = false;


  constructor(
    private database: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private toasts: ToastsService) {
    this.storage = getStorage();
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID');
    this.toasts.routineAdded = false;
   }

   /**
    * Subir imagen a Firebase Storage
    * @param event
    */
   uploadFile(event: any) {
    const file = event.target.files[0];
    if (file.size > this.maxSize || file.type.split('/')[0] !== 'image') {
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

  addRoutine(){
    this.database.addRoutine(this.title, this.photoURL, this.userID, this.auth.userID);
    this.toasts.routineAdded = true;
    this.saved = true;
    this.router.navigate(['/trainer/routines']);
  }

  /**
   * Borra la imagen de Firebase Storage si se ha subido pero no se ha guardado
   */
  ngOnDestroy(): void {
    if(this.uploaded && !this.saved){
      const storageRef = ref(this.storage, this.photoURL);
      deleteObject(storageRef);
    }
  }
}
