import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  updateEmail,
  deleteUser
} from '@angular/fire/auth';
import {
  Firestore,
  setDoc,
  doc,
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
  public userExists: boolean = false;
  public userChecked: boolean = false;
  public thirdPartyLogin: boolean = false;
  public userModificationError: string = '';

  constructor(
    public auth: Auth,
    public router: Router,
    public database: Firestore
  ) {}

  /**
   * Comprobar si el usuario está logueado
   */
  checkAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLogged = true;
        this.userEmail = user.email;
        this.userID = user.uid;
        this.userPhoto = user.photoURL;
        this.checkUserRol();
        this.getUserPhoto();
        this.getLoginMethod();
      } else {
        this.isLogged = false;
        this.userID = '';
      }
    });
  }

  /**
   * Comprobar si el usuario es administrador o entrenador preparado para el guard
   */
  async checkAuthStateAsync() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.isLogged = true;
          this.userEmail = user.email;
          this.userID = user.uid;
          this.userPhoto = user.photoURL;
          // this.loaded = true;
          this.checkUserRol().then(() => {
            this.getUserPhoto();
            this.getLoginMethod();
            resolve(true);
          });
        } else {
          this.isLogged = false;
          this.userID = '';
          resolve(false);
        }
      });
    });
  }
  /**
   * Registrar con email y contraseña
   * @param email
   * @param password
   * @param username
   */
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

  /**
   * Loguear con email y contraseña
   * @param email
   * @param password
   */
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
        if(error.message == 'Firebase: Error (auth/user-not-found).'){
          this.failedError = 'This user does not exist';
        } else if (error.message == 'Firebase: Error (auth/wrong-password).'){
          this.failedError = 'Wrong password';
        }
      });
  }

  /**
   * Loguear con Google
   */
  googleLogin() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCredential) => {
        this.isLogged = true;
        this.userID = userCredential.user.uid;
        this.userEmail = userCredential.user.email;
        this.userPhoto = userCredential.user.photoURL;
        this.username = userCredential.user.displayName;
        this.thirdPartyLogin = true;
        this.createUser();
        this.checkUserRol();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.isLogged = false;
        this.userID = '';
      });
  }

  twitterLogin(){
    signInWithPopup(this.auth, new TwitterAuthProvider())
    .then((userCredential) => {
        this.isLogged = true;
        this.userID = userCredential.user.uid;
        this.userEmail = userCredential.user.email;
        this.userPhoto = userCredential.user.photoURL;
        this.username = userCredential.user.displayName;
        this.thirdPartyLogin = true;
        this.createUser();
        this.checkUserRol();
        this.router.navigate(['/']);
    })
    .catch((error) => {
      this.isLogged = false;
      this.userID = '';
    });
  }

  /**
   * Cerar sesión
   */
  signOut() {
    this.auth.signOut();
    this.isLogged = false;
    this.userID = '';
    this.router.navigate(['/']);
    this.isAdmin = false;
    this.isTrainer = false;
    this.userEmail = '';
    this.userPhoto = null;
    this.username = '';
    this.failedError = '';
    this.userExists = false;
    this.userChecked = false;
    this.thirdPartyLogin = false;
  }


  /**
   * Comprobar si el usuario existe en la base de datos
   * @returns boolean
   */
  async checkIfUserExists() {
    const docRef = doc(this.database, 'users', this.userID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  /**
   * Comprobar si el usuario existe en la base de datos como entrenador
   * @returns boolean
   */
  async checkIfTrainerExists() {
    const docRef = doc(this.database, 'trainers', this.userID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  /**
   * Comprobar si el usuario es administrador o entrenador o usuario normal
   * Cambiar el valor de las variables isAdmin y isTrainer
   */
  async checkUserRol() {
    if (this.userID == adminID) {
      this.isAdmin = true;
      // this.checked = true;
      return;
    }

    const trainerRef = doc(this.database, 'trainers', this.userID);
    const trainerSnap = await getDoc(trainerRef);
    if (trainerSnap.exists()) {
      this.isTrainer = true;
      // this.checked = true;
      return;
    }
  }

  /**
   * Crear usuario en la base de datos si no existe ya en la tabla de usuarios o entrenadores
   */
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
        thirdParty: this.thirdPartyLogin,
      });
    } else {
      return;
    }
  }

  /**
   * Obtener la foto de perfil del usuario
   * Cambiar el valor de la variable userPhoto
   */
  getUserPhoto() {
    const userRef = doc(this.database, 'users', this.userID);
    const trainerRef = doc(this.database, 'trainers', this.userID);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        this.userPhoto = doc.data()['photoURL'];
      } else{
        getDoc(trainerRef).then((doc) => {
          if (doc.exists()) {
            this.userPhoto = doc.data()['photoURL'];
          }
        });
      }
    });
  }

  /**
   * Obtener si un usuario se logeo con una cuenta de terceros
   * Cambiar el valor de la variable 3rdPartyLogin
   */
  getLoginMethod() {
    const userRef = doc(this.database, 'users', this.userID);
    const trainerRef = doc(this.database, 'trainers', this.userID);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        this.thirdPartyLogin = doc.data()['thirdParty'];
      } else{
        getDoc(trainerRef).then((doc) => {
          if (doc.exists()) {
            this.thirdPartyLogin = doc.data()['thirdParty'];
          }
        });
      }
    });
  }

  /**
   * Actualizar la contraseña del usuario
   * @param password
   */
  updatePassword(password: string) {
    updatePassword(this.auth.currentUser, password)
      .then(() => {
        this.userModificationError = '';
      })
      .catch((error) => {
        if(error.code == 'auth/requires-recent-login'){
          this.userModificationError = 'You need to reauthenticate to delete your account';
        }
      });
  }

  /**
   * Actualizar el email del usuario
   * @param email
   */
  updateEmail(email: string) {
    updateEmail(this.auth.currentUser, email)
      .then(() => {
        this.userModificationError = '';
      })
      .catch((error) => {
        if(error.code == 'auth/requires-recent-login'){
          this.userModificationError = 'You need to reauthenticate to delete your account';
        }
      });
  }

  /**
   * Borrar la cuenta del usuario
   * @param authUser
   */
  deleteAccount(authUser: any) {
    deleteUser(authUser).then(() => {
      this.userModificationError = '';
    }).catch((error) => {
      if(error.code == 'auth/requires-recent-login'){
        this.userModificationError = 'You need to reauthenticate to delete your account';
      }
    });
  }

  /**
   * Enviar email para restablecer la contraseña
   * @param email
   */
  sendPasswordResetEmail(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.userChecked = true;
      })
      .catch((error) => {
        this.userChecked = false;
        if(error.code == 'auth/user-not-found'){
          this.failedError = 'There is no user record corresponding to this email';
        }
      });
  }
}
