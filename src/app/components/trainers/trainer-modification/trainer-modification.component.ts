import { Component,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-trainer-modification',
  templateUrl: './trainer-modification.component.html',
  styleUrls: ['./trainer-modification.component.scss']
})
export class TrainerModificationComponent implements OnInit {
  trainer: any;
  loading = true;
  membership: Date;

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

  userFromNativeAuth: any = getAuth();


  constructor(private database: DatabaseService, public auth: AuthService) {
    this.storage = getStorage();
  }

  id: string = this.auth.userID

  ngOnInit(): void {
    this.database.getTrainerData(this.id).then((data) => {
      this.trainer = data;
      this.loading = false;
      this.membership = new Date(this.trainer.timestamp);
    });
  }


  changePassword() {
    let regularExpression = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$");

    if(regularExpression.test(this.newPassword)){
      this.passwordCorrect = true;
    }else{
      this.passwordCorrect = false;
      this.errorMessage = 'Password must be between 8 and 32 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character';
    }

    if (this.newPassword == this.confirmNewPassword) {
      if(this.passwordCorrect) {
        this.auth.updatePassword(this.newPassword);
        this.success = true;
      }
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  changeEmail() {
    this.auth.updateEmail(this.newEmail);
    this.database.updateEmail(this.id, this.newEmail);
  }

  changeDisplayName() {
    this.database.updateDisplayName(this.id, this.newDisplayName);
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const storageRef = ref(this.storage, `${this.basePath}/${file.name}`);
    uploadBytes(storageRef, file).then(() => {
      this.uploaded = true;
      this.uploadMessage = 'Image Uploaded';
      getDownloadURL(storageRef).then((url) => {
        this.uploadedPhotoURL = url;
      });
    });
  }

  // FIXME: Cierra sesión al cambiar el email ¿debería?
  changeData(){
    if(this.uploadedPhotoURL != null){
      this.database.updatePhotoURL(this.id, this.uploadedPhotoURL);
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

    if(this.newPassword != null){
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

  deleteTrainer() {
    let confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      this.auth.deleteAccount(this.userFromNativeAuth.currentUser);
      this.database.deleteTrainerWithUserID(this.auth.userID);
      this.database.deleteUserData(this.auth.userID, true);
      this.auth.signOut();
    }
  }
}
