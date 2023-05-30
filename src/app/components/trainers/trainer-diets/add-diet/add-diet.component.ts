import { Component, OnDestroy } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@angular/fire/storage';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-diet',
  templateUrl: './add-diet.component.html',
  styleUrls: ['./add-diet.component.scss']
})
export class AddDietComponent implements OnDestroy {
  /**
   * Ruta del storage de Firebase
   */
  basePath: string = 'diets';

  /**
   * Datos de la dieta
   */
  name: string = '';
  description: string = '';
  photoURL: string = '';

  /**
   * Gestión de la imagen
   */
  uploaded: boolean = false;
  saved: boolean = false;
  storage: any;
  uploadMessage: string = 'Choose Image';
  userID: string = this.route.snapshot.paramMap.get('userID');
  maxSize: number = 3145728;
  fileTooBig: boolean = false;

  constructor(
    private database: DatabaseService,
    private router: Router,
    private toasts: ToastsService,
    private auth: AuthService,
    private route: ActivatedRoute
    ) {
    this.storage = getStorage();
    this.toasts.machineAdded = false;
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

  /**
   * Añadir dieta a la base de datos
   */
  addDiet(){
    this.database.addDiet(this.name, this.description, this.photoURL, this.auth.userID, this.userID );
    this.toasts.machineAdded = true;
    this.saved = true;
    this.router.navigate(['/trainer/diets']);
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
