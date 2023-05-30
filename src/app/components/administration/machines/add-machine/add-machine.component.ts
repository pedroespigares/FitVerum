import { Component, OnDestroy } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent implements OnDestroy{
  /**
   * Ruta de la carpeta en Firebase Storage donde se subirán las imágenes
   */

  basePath: string = 'machines';

  /**
   * Datos de la máquina a añadir
   */
  name: string = '';
  description: string = '';
  photoURL: string = '';

  /**
   * Variables para el control de la subida de la imagen
   */
  uploaded: boolean = false;
  saved: boolean = false;
  storage: any;
  uploadMessage: string = 'Choose Image';
  maxSize: number = 3145728;
  fileTooBig: boolean = false;

  /**
   *
   * @param database - Servicio de base de datos
   * @param router - Servicio de rutas
   * @param toasts - Servicio de toasts
   */
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
   * Añadir máquina a la base de datos
   */
  addMachine(){
    this.database.addMachine(this.name, this.description, this.photoURL);
    this.toasts.machineAdded = true;
    this.saved = true;
    this.router.navigate(['/administration/machines']);
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
