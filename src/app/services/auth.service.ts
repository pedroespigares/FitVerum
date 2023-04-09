import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  deleteUser,
  updatePassword,
  sendPasswordResetEmail,
  updateEmail
} from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { adminID } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: boolean = false;
  public userID: string = '';
  public userEmail: string = '';
  public userPhoto: string = null;
  public username: string = '';
  public failedError: string = '';
  public isTrainer: boolean = false;
  public isAdmin: boolean = false;

  constructor(
    public auth: Auth,
    public router: Router,
    public database: Firestore
  ) {}

  checkAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLogged = true;
        this.userEmail = user.email;
        this.userID = user.uid;
        this.userPhoto = user.photoURL;
        this.checkUserRol();
        this.getUserPhoto();
      } else {
        this.isLogged = false;
        this.userID = '';
      }
    });
  }

  register(email: string, password: string, username: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.isLogged = true;
        this.userID = userCredential.user.uid;
        this.userEmail = userCredential.user.email;
        this.username = username;
        this.createUser();
        this.checkUserRol();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.isLogged = false;
        this.userID = '';
        this.failedError = error.message
          .split('Firebase: Error (auth/')[1]
          .split(').')[0];
      });
  }

  normalLogin(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.isLogged = true;
        this.userID = userCredential.user.uid;
        this.userEmail = userCredential.user.email;
        this.getUserPhoto();
        this.checkUserRol();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.isLogged = false;
        this.userID = '';
        this.failedError = error.message
          .split('Firebase: Error (auth/')[1]
          .split(').')[0];
      });
  }

  googleLogin() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCredential) => {
        this.isLogged = true;
        this.userID = userCredential.user.uid;
        this.userEmail = userCredential.user.email;
        this.userPhoto = userCredential.user.photoURL;
        this.username = userCredential.user.displayName;
        this.createUser();
        this.checkUserRol();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.isLogged = false;
        this.userID = '';
      });
  }

  // githubLogin(){
  //   signInWithPopup(this.auth, new GithubAuthProvider())
  //   .then((userCredential) => {
  //     this.isLogged = true;
  //     this.userID = userCredential.user.uid;
  //     this.userEmail = userCredential.user.email
  //     this.userPhoto = userCredential.user.photoURL;
  //     this.router.navigate(['/']);
  //   })
  //   .catch((error) => {
  //     this.isLogged = false;
  //     this.userID = '';
  //   });
  // }

  signOut() {
    this.auth.signOut();
    this.isLogged = false;
    this.userID = '';
    this.router.navigate(['/']);
    this.isAdmin = false;
    this.isTrainer = false;
  }

  isAuthentificated() {
    return this.isLogged;
  }




  // Comprobar si el usuario existe en la base de datos tanto como usuario como entrenador

  async checkIfUserExists() {
    const docRef = doc(this.database, 'users', this.userID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  async checkIfTrainerExists() {
    const docRef = doc(this.database, 'trainers', this.userID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  async checkUserRol() {
    if (this.userID == adminID) {
      this.isAdmin = true;
      return;
    }

    const trainerRef = doc(this.database, 'trainers', this.userID);
    const trainerSnap = await getDoc(trainerRef);
    if (trainerSnap.exists()) {
      this.isTrainer = true;
      return;
    }
  }

  // Create user in database if it doesn't exist
  async createUser() {
    let userExists: any = await this.checkIfUserExists();
    let trainerExists: any = await this.checkIfTrainerExists();

    if (!userExists && !trainerExists) {
      await setDoc(doc(this.database, 'users', this.userID), {
        userID: this.userID,
        displayName: this.username,
        photoURL: this.userPhoto,
        email: this.userEmail,
        trainerID: null,
        timestamp: Date.now(),
      });
    } else {
      return;
    }
  }

  // Get user photo from database
  getUserPhoto() {
    const userRef = doc(this.database, 'users', this.userID);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        this.userPhoto = doc.data()['photoURL'];
      }
    });
  }

  updatePassword(password: string) {
    updatePassword(this.auth.currentUser, password)
      .then(() => {
        // 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateEmail(email: string) {
    updateEmail(this.auth.currentUser, email)
      .then(() => {
        // 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sendPasswordResetEmail(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        // 
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
