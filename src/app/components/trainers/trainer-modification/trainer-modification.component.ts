import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { getAuth } from '@angular/fire/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-modification',
  templateUrl: './trainer-modification.component.html',
  styleUrls: ['./trainer-modification.component.scss']
})
export class TrainerModificationComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  /**
   * Entrenador a mostrar
   */
  trainer: any;
  loading = true;
  membership: Date;

  /**
   * Gestión de storage
   */
  storage: any;
  basePath: string = 'users';

  email: string;

  newPassword: string = null;
  confirmNewPassword: string = null;

  newEmail: string = null;;
  newDisplayName: string = null;

  uploaded: boolean = false;
  uploadMessage: string = 'Change profile picture';

  errorMessage: string = '';
  successMessage: string = 'User Data changed successfully'
  passwordCorrect: boolean;
  success: boolean = false;

  uploadedPhotoURL: string = null;

  photoChanged: boolean = false;
  emailChanged: boolean = false;
  displayNameChanged: boolean = false;
  passwordChanged: boolean = false;

  maxSize: number = 3145728;
  fileTooBig: boolean = false;

  userFromNativeAuth: any = getAuth();


  constructor(private database: DatabaseService, public auth: AuthService, private modalService: NgbModal) {
    this.storage = getStorage();
  }

  id: string = this.auth.userID

  /**
   * Obtiene los datos del entrenador
   */
  ngOnInit(): void {
    this.database.getTrainerData(this.id).then((data) => {
      this.trainer = data;
      this.loading = false;
      this.membership = new Date(this.trainer.timestamp);
    });
  }


  /**
   * Cambia la contraseña del usuario si cumple la expresión regular y es igual a la confirmación de la nueva contraseña
   * Si no cumple la expresión regular se muestra un mensaje de error
   * Si no coincide la nueva contraseña con la confirmación se muestra un mensaje de error
   * Si todo va bien se cambia la contraseña y se cierra sesión
   */
  changePassword() {
    let regularExpression = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$");

    if(regularExpression.test(this.newPassword)){
      this.passwordCorrect = true;
    }else{
      this.passwordCorrect = false;
      this.errorMessage = 'Password must be between 8 and 32 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character';
      return;
    }

    if (this.newPassword == this.confirmNewPassword) {
      if(this.passwordCorrect) {
        this.auth.updatePassword(this.newPassword);
        this.auth.signOut();
        this.success = true;
      }
    } else {
      this.errorMessage = 'Passwords do not match';
      return;
    }
  }

  /**
   * Cambia el email del usuario y cierra sesión
   */
  changeEmail() {
    this.database.updateEmail(this.id, this.newEmail, true);
    this.auth.updateEmail(this.newEmail);
    this.auth.signOut();
  }

  /**
   * Cambia el nombre del usuario y cierra sesión
   */
  changeDisplayName() {
    this.database.updateDisplayName(this.id, this.newDisplayName, true);
    this.auth.signOut();
  }

  /**
   * Sube la imagen al storage de firebase y obtiene la url de la imagen
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
        this.uploadedPhotoURL = url;
      });
    });
  }

  /**
   * Cambia los datos del usuario que se hayan modificado
   */
  changeData(){
    if(this.uploadedPhotoURL != null){
      this.database.updatePhotoURL(this.id, this.uploadedPhotoURL, true);
      this.passwordChanged = true;
    }

    if(this.newEmail != null){
      this.changeEmail();
      this.emailChanged = true;
    }

    if(this.newDisplayName != null){
      this.changeDisplayName();
      this.displayNameChanged = true;
    }

    if(this.newPassword != null && this.confirmNewPassword != null){
      this.changePassword();
      this.passwordChanged = true;
    }

    if(this.passwordChanged || this.emailChanged || this.displayNameChanged || this.photoChanged){
      this.database.getUserData(this.id).then((data) => {
        this.trainer = data;
        this.loading = false;
        this.membership = new Date(this.trainer.timestamp);
        this.email = this.auth.userEmail;

        this.auth.checkAuthState();
        this.auth.userPhoto = this.trainer.photoURL;
      });
    }
  }

  /**
   * Elimina el usuario de la base de datos y de la autenticación
   */
  deleteTrainer() {
    this.database.deleteTrainerWithUserID(this.auth.userID);
    this.database.deleteUserData(this.auth.userID, true);
    this.auth.deleteAccount(this.userFromNativeAuth.currentUser).then(() => {
          this.auth.signOut();
    });
    this.modalService.dismissAll();
  }

  /**
   * Abre el modal de confirmación de eliminación de usuario
   */
  open() {
    this.modalService.open(this.modalContent, { size: 'md', centered: true, keyboard: true});
	}
}
