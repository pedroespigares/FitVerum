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
  selector: 'app-edit-diet',
  templateUrl: './edit-diet.component.html',
  styleUrls: ['./edit-diet.component.scss']
})
export class EditDietComponent implements OnInit, OnDestroy{

  /**
   * Ruta del storage de Firebase
   */
  basePath = 'diets';

  /**
   * Dieta a editar
   */
  diet: any;

  /**
   * Datos de la dieta
   */
  name: string;
  description: string;
  newImage: string;

  /**
   * Gestión de la imagen
   */
  uploadMessage: string = 'Choose Image';
  dietUploaded: boolean = false;
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

  /**
   * Obtener la dieta a editar
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getByID(id, "diets").then((diet) => {
      this.diet = diet;
      this.dietUploaded = true;
      this.name = this.diet.name;
      this.description = this.diet.description;
      this.previousPhotoURL = this.diet.photoURL;
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
  updateDiet(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(this.newPhotoURL == null) {
      this.database.updateDiet(id, this.name, this.description, this.previousPhotoURL);
      this.updated = true;
    } else {
      this.database.updateDiet(id, this.name, this.description, this.newPhotoURL);
      this.deletePhotoFromStorage(this.previousPhotoURL);
      this.updated = true;
    }
    this.router.navigate(['/trainer/diets']);
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
