import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.component.html',
  styleUrls: ['./edit-routine.component.scss']
})
export class EditRoutineComponent implements OnInit, OnDestroy {

  basePath = 'routines';
  routine: any;
  title: string;
  newImage: string;
  uploadMessage: string = 'Choose Image';
  routineUploaded: boolean = false;
  uploaded: boolean = false;
  updated: boolean = false;
  previousPhotoURL: string;
  newPhotoURL: string = null;
  storage: any;
  maxSize: number = 3145728;
  fileTooBig: boolean = false;

  loading: boolean = true;

  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) {
    this.storage = getStorage();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getByID(id, "routines").then((routine) => {
      this.routine = routine;
      this.routineUploaded = true;
      this.title = this.routine.title;
      this.previousPhotoURL = this.routine.photoURL;
      this.loading = false;
    });
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
        this.newPhotoURL = url;
      });
    });
  }

  /**
   * Borrar imagen de Firebase Storage
   * @param photoURL
   */

  deletePhotoFromStorage(photoURL: string): void {
    const photoRef = ref(this.storage, photoURL);
    deleteObject(photoRef)
  }

  /**
   * Actualizar máquina
   */
  updateRoutine(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(this.newPhotoURL == null) {
      this.database.updateRoutine(id, this.title, this.previousPhotoURL);
      this.updated = true;
    } else {
      this.database.updateRoutine(id, this.title, this.newPhotoURL);
      this.deletePhotoFromStorage(this.previousPhotoURL);
      this.updated = true;
    }
    this.router.navigate(['/trainer/routines']);
  }

  /**
   * Borra la imagen de Firebase Storage si se ha subido pero no se ha guardado
   */
  ngOnDestroy(): void {
    if(this.uploaded && !this.updated){
      const storageRef = ref(this.storage, this.newPhotoURL);
      deleteObject(storageRef);
    }
  }
}
