import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
  orderBy,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  /**
   * Constructor con las dependencias necesarias (Firestore y AuthService)
   * @param database - Firestore
   * @param auth - AuthService
   */
  constructor(public database: Firestore, public auth: AuthService) {}


  // --------------------------------------------------------------------------------------------
  // Getters

  /**
   * Obtener el ID del entrenador de un usuario
   * @param userID - ID del usuario
   * @returns - ID del entrenador
   */
  async getUserTrainer(userID: string) {
    const userRef = doc(this.database, 'users', userID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      if (userSnap.data()['trainerID'] != null) {
        return userSnap.data()['trainerID'];
      }
    }
  }

  /**
   * Obtener la foto de perfil del usuario
   * Cambiar el valor de la variable userPhoto
   */
  async getUserPhoto(userID: string) {
    const userRef = doc(this.database, 'users', userID);
    const trainerRef = doc(this.database, 'trainers', userID);
    await getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        return doc.data()['photoURL'];
      } else{
        getDoc(trainerRef).then((doc) => {
          if (doc.exists()) {
            return doc.data()['photoURL'];
          }
        });
      }
    });
  }

  /**
   * Obtener todos los usuarios
   * @returns - Observable con los usuarios
   */
  getUsers(): Observable<any[]> {
    const usersRef = collection(this.database, 'users');
    return collectionData(usersRef, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener los datos de un usuario
   * @param userID - ID del usuario
   * @returns - Datos del usuario
   */
  async getUserData(userID: string) {
    const userRef = doc(this.database, 'users', userID);
    const docSnap = await getDoc(userRef);
    if(docSnap.exists()){
      return docSnap.data();
    } else {
      return null;
    }
  }

  /**
   * Obtener los datos de un usuario
   * @param userID - ID del usuario
   * @returns - Datos del usuario
   */
  async getUserDocumentID(userID: string) {
    const userRef = collection(this.database, 'users');
    const q = query(userRef, where('userID', '==', userID));
    const querySnapshot = await getDocs(q);
    let id = '';
    querySnapshot.forEach((doc) => {
      id = doc.id;
    }
    );
    return id;
  }

  /**
   * Obtener los datos de un usuario
   * @param userID - ID del usuario
   * @returns - Datos del usuario
   */
  async getTrainerDocumentID(trainerID: string) {
    const trainerRef = collection(this.database, 'trainers');
    const q = query(trainerRef, where('trainerID', '==', trainerID));
    const querySnapshot = await getDocs(q);
    let id = '';
    querySnapshot.forEach((doc) => {
      id = doc.id;
    }
    );
    return id;
  }

  /**
   * Obtener los usuarios sin entrenador
   * @returns - Observable con los usuarios sin entrenador
   */
  getUsersWithoutTrainer(): Observable<any[]> {
    const usersRef = collection(this.database, 'users');
    const q = query(usersRef, where('trainerID', '==', null));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener todos los entrenadores
   * @returns - Observable con los entrenadores
   */
  getTrainers(): Observable<any[]> {
    const trainersRef = collection(this.database, 'trainers');
    return collectionData(trainersRef, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener los datos de un entrenador
   * @param trainerID - ID del entrenador
   * @returns - Datos del entrenador
   */
  async getTrainerData(trainerID: string) {
    const trainerRef = doc(this.database, 'trainers', trainerID);
    const docSnap = await getDoc(trainerRef);
    if(docSnap.exists()){
      return docSnap.data();
    } else {
      return null;
    }
  }

  /**
   * Obtener los clientes de un entrenador
   * @param trainerID
   * @returns - Observable con los clientes del entrenador
   */
  getTrainerClients(trainerID: string): Observable<any[]> {
    const usersRef = collection(this.database, 'users');
    const q = query(usersRef, where('trainerID', '==', trainerID));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }


  /**
   * Obtener las rutinas de un usuario
   * @param user - ID del usuario
   * @returns - Observable con las rutinas del usuario
   */
  getRoutines(user: string): Observable<any[]> {
    const routinesRef = collection(this.database, 'routines');
    const q = query(routinesRef, where('userID', '==', user));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener las dietas de un usuario
   * @param user - ID del usuario
   * @returns - Observable con las dietas del usuario
   */
  getDiets(user: string): Observable<any[]> {
    const routinesRef = collection(this.database, 'diets');
    const q = query(routinesRef, where('userID', '==', user));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener todas las máquinas
   * @returns - Observable con todas las máquinas
   */
  getMachines(): Observable<any[]> {
    const machinesRef = collection(this.database, 'machines');
    return collectionData(machinesRef, { idField: 'id' }) as Observable<any[]>;
  }


  /**
   * Obtener los ejercicios de una rutina
   * @param routineID - ID de la rutina
   * @returns - Observable con los ejercicios de la rutina
   */
  getExercisesByRoutine(routineID: string): Observable<any[]> {
    const exercisesRef = collection(this.database, 'exercises');
    const q = query(exercisesRef, where('routineID', '==', routineID));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener los mensajes del foro
   * @returns - Observable con los mensajes del foro
   */
  getForumMessages(): Observable<any[]> {
    const messagesRef = collection(this.database, 'forumMessages');
    const q = query(messagesRef, orderBy('date', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }


  /**
   * Obtener las entradas de un usuario en un ejercicio
   * @param userID - ID del usuario
   * @param exerciseID - ID del ejercicio
   * @returns - Array con las entradas del usuario en el ejercicio
   */
  async getDataFromUserEntry(userID: string, exerciseID: string){
    const entryRef = collection(this.database, 'userEntry');
    const q = query(entryRef, where('userID', '==', userID), where('exerciseID', '==', exerciseID), orderBy('start', 'asc'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({weight: doc.data()['kg'], series: doc.data()['series'], repetitions: doc.data()['repetitions'], date: doc.data()['start']});
    });
    return data;
  }

  /**
   * Obtener la foto de una máquina (los ejercicios no tienen foto, utilizamos la de la máquina que corresponda)
   * @param id - ID de la máquina
   * @returns
   */
  async getMachinePhoto(id: string){
    const machineRef = doc(this.database, 'machines', id);
    const docSnap = await getDoc(machineRef);
    return docSnap.data()['photoURL'];
  }

/**
 * Obtener un elemento por su ID y colección
 * @param id
 * @param collection
 * @returns
 */
  async getByID(id: string, collection: string) {
    const machineRef = doc(this.database, collection , id);
    const docSnap = await getDoc(machineRef);
    return docSnap.data();
  }

  /**
   * Obtener el nombre de una rutina
   * @param id - ID de la rutina
   * @returns - Nombre de la rutina
   */
  async getRoutineTitle(routineID: string){
    const routineRef = doc(this.database, 'routines', routineID);
    const docSnap = await getDoc(routineRef);
    return docSnap.data()['title'];
  }

  /**
   * Obtener el nombre de un ejercicio
   * @param id - ID de la ejercicio
   * @returns - Nombre de la ejercicio
   */
  async getExerciseTitle(exerciseID: string){
    const exerciseRef = doc(this.database, 'exercises', exerciseID);
    const docSnap = await getDoc(exerciseRef);
    return docSnap.data()['title'];
  }

  /**
   * Obtener las citas de un entrenador
   * @param trainerID - ID del entrenador
   * @returns - Observable con las citas
   */
  getAppointmentsOfTrainer(trainerID: string): Observable<any[]> {
    const appointmentsRef = collection(this.database, 'trainerEntry');
    const q = query(appointmentsRef, where('trainerID', '==', trainerID));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener las entradas de un usuario
   * @param userID - ID del usuario
   * @returns - Observable con las citas
   */
  getUserEntries(userID: string): Observable<any[]> {
    const entriesRef = collection(this.database, 'userEntry');
    const q = query(entriesRef, where('userID', '==', userID));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener la rutina relacionada a un ejercicio
   * @param exerciseID
   * @returns
   */
  async getRoutineByExercise(exerciseID: string){
    const exerciseRef = doc(this.database, 'exercises', exerciseID);
    const docSnap = await getDoc(exerciseRef);
    return docSnap.data()['routineID'];
  }

// --------------------------------------------------------------------------------------------




// --------------------------------------------------------------------------------------------
// En los convert & subscribe lo que hacemos es "traspasar" los datos de un documento a otro

  /**
   * Convertir un usuario en entrenador
   * @param id - ID del usuario
   */
  convertUserToTrainer(id: string) {
    const userRef = doc(this.database, 'users', id);
    const trainerRef = doc(this.database, 'trainers', id);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        setDoc(trainerRef, {
          trainerID: doc.data()['userID'],
          displayName: doc.data()['displayName'],
          photoURL: doc.data()['photoURL'],
          timestamp: doc.data()['timestamp'],
          email: doc.data()['email'],
          thirdParty: doc.data()['thirdParty'],
        });
        deleteDoc(userRef);
      }
    });
  }

  /**
   * Convertir un entrenador en usuario
   * @param id - ID del entrenador
   */
  convertTrainerToUser(id: string) {
    const userRef = doc(this.database, 'users', id);
    const trainerRef = doc(this.database, 'trainers', id);
    getDoc(trainerRef).then((doc) => {
      if (doc.exists()) {
        setDoc(userRef, {
          userID: doc.data()['trainerID'],
          displayName: doc.data()['displayName'],
          photoURL: doc.data()['photoURL'],
          trainerID: null,
          timestamp: doc.data()['timestamp'],
          email: doc.data()['email'],
          thirdParty: doc.data()['thirdParty'],
        });
        deleteDoc(trainerRef);
      }
    });
  }

  /**
   * Convertir un usuario en cliente de un entrenador
   * @param userID - ID del usuario
   * @param trainerID - ID del entrenador
   */
  subscribeClient(userID: string, trainerID: string) {
    const userRef = doc(this.database, 'users', userID);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        updateDoc(userRef, {
          trainerID: trainerID,
        });
      }
    });
  }

  /**
   * Quita a un usuario de la lista de clientes de un entrenador
   * @param userID - ID del usuario
   */
  unsubscribeClient(userID: string) {
    const userRef = doc(this.database, 'users', userID);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        updateDoc(userRef, {
          trainerID: null,
        });
      }
    });
  }

  /**
   * Borrar mensaje del foro
   * @param messageID - ID del mensaje
   */
  deleteForumMessage(messageID: string) {
    const messageRef = doc(this.database, 'forumMessages', messageID);
    deleteDoc(messageRef);
  }
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// Updates


  /**
   * Actualizar el nombre de un usuario
   * @param id - ID del usuario
   * @param displayName - Nombre a actualizar
   */
  updateDisplayName(id: string, displayName: string, isTrainer: boolean = false) {
    const userRef = doc(this.database, 'users', id);
    const trainerRef = doc(this.database, 'trainers', id);
    if(isTrainer){
      updateDoc(trainerRef, {
        displayName: displayName,
      });
    } else{
      updateDoc(userRef, {
        displayName: displayName,
      });
    }
  }

  /**
   * Actualizar la foto de perfil de un usuario
   * @param id - ID del usuario
   * @param photoURL - URL de la foto a actualizar
   */
  updatePhotoURL(id: string, photoURL: string, isTrainer: boolean = false) {
    const userRef = doc(this.database, 'users', id);
    const trainerRef = doc(this.database, 'trainers', id);
    if(isTrainer){
      updateDoc(trainerRef, {
        photoURL: photoURL,
      });
    } else{
      updateDoc(userRef, {
        photoURL: photoURL,
      });
    }
  }


  /**
   * Actualizar el email de un usuario
   * @param id - ID del usuario
   * @param email - Email a actualizar
   */
  updateEmail(id: string, email: string, isTrainer: boolean = false) {
    const userRef = doc(this.database, 'users', id);
    const trainerRef = doc(this.database, 'trainers', id);
    if(isTrainer){
      updateDoc(trainerRef, {
        email: email,
      });
    } else{
      updateDoc(userRef, {
        email: email,
      });
    }
  }

  /**
   * Actualizar los datos de una máquina
   * @param id - ID de la máquina
   * @param name - Nombre de la máquina
   * @param description - Descripción de la máquina
   * @param photoURL - URL de la foto de la máquina
   */
  updateMachine(id: string, name: string, description: string, photoURL: string) {
    const machineRef = doc(this.database, 'machines', id);
    updateDoc(machineRef, {
      name: name,
      description: description,
      photoURL: photoURL,
    });
  }

  /**
   * Actualizar los datos de un ejercicio
   * @param id - ID del ejercicio
   * @param title - Título del ejercicio
   * @param description - Descripción del ejercicio
   * @param machineID - ID de la máquina que se usa en el ejercicio
   * @param routineID - ID de la rutina a la que pertenece el ejercicio
   */
  updateExercise(id: string, title: string, description: string, machineID: string, routineID: string) {
    const exerciseRef = doc(this.database, 'exercises', id);
    updateDoc(exerciseRef, {
      title: title,
      description: description,
      machineID: machineID,
      routineID: routineID,
    });
  }

  /**
   * Actualizar los datos de una dieta
   * @param id - ID de la dieta
   * @param name - Nombre de la máquina
   * @param description - Descripción de la máquina
   * @param photoURL - URL de la foto de la máquina
   */
  updateDiet(id: string, name: string, description: string, photoURL: string) {
    const machineRef = doc(this.database, 'diets', id);
    updateDoc(machineRef, {
      name: name,
      description: description,
      photoURL: photoURL,
    });
  }

  /**
   * Actualizar las fechas de una cita
   * @param id - ID de la cita
   * @param from_date - Fecha de inicio
   * @param to_date - Fecha de fin
   */
  updateAppointmentDates(id: string, from_date: number, to_date: number){
    const appointmentRef = doc(this.database, 'trainerEntry', id);
    updateDoc(appointmentRef, {
      start: from_date,
      end: to_date,
    });
  }

  /**
   * Actualizar la fecha de una entrada de usuario
   * @param id - ID de la entrada
   * @param date - Nueva fecha de la entrada
   */
  updateUserEntryDate(id: string, date: number){
    const userEntryRef = doc(this.database, 'userEntry', id);
    updateDoc(userEntryRef, {
      start: date,
    });
  }

  updateUserEntry(id:string, userID: string, start: number, kg: number, repetitions: number, series: number, color: string, title: string, exerciseID: string,comment:string = null){
    const userEntryRef = doc(this.database, 'userEntry', id);
    updateDoc(userEntryRef, {
      userID: userID,
      start: start,
      kg: kg,
      repetitions: repetitions,
      series: series,
      color: {
        primary: color,
        secondary: color,
      },
      draggable: true,
      comment: comment,
      title: title,
      exerciseID: exerciseID,
    });
  }

  /**
   * Actualizar una rutina
   * @param id
   * @param title
   * @param photoURL
   */
  updateRoutine(id: string, title: string, photoURL: string){
    const routineRef = doc(this.database, 'routines', id);
    updateDoc(routineRef, {
      title: title,
      photoURL: photoURL,
    });
  }
// --------------------------------------------------------------------------------------------




// --------------------------------------------------------------------------------------------
// Inserts / add / creates

  /**
   * Añadir una máquina a la base de datos
   * @param name - Nombre de la máquina
   * @param description - Descripción de la máquina
   * @param photoURL - URL de la foto de la máquina
   */
  addMachine(name: string, description: string, photoURL: string) {
    const machinesRef = collection(this.database, 'machines');
    setDoc(doc(machinesRef), {
      name: name,
      description: description,
      photoURL: photoURL,
    });
  }

  /**
   * Añadir una dieta a la base de datos
   * @param title - Nombre de la dieta
   * @param description - Descripción de la máquina
   * @param photoURL - URL de la foto de la máquina
   */
  addDiet(name: string, description: string, photoURL: string, trainerID: string, userID: string) {
    const machinesRef = collection(this.database, 'diets');
    setDoc(doc(machinesRef), {
      name: name,
      description: description,
      photoURL: photoURL,
      trainerID: trainerID,
      userID: userID,
    });
  }

  /**
   * Crear una cita
   * @param userID - ID del usuario
   * @param trainerID - ID del entrenador
   * @param from_date - Fecha de inicio
   * @param to_date - Fecha de fin
   * @param color - Color del evento
   * @param title - Titulo del evento
   * @param description - Descripción del evento
   */

  createAppointment(userID: string, trainerID: string, from_date: number, to_date: number, color: string, title: string, description: string){
    const appointmentsRef = collection(this.database, 'trainerEntry');
    setDoc(doc(appointmentsRef), {
      userID: userID,
      title: title,
      description: description,
      trainerID: trainerID,
      start: from_date,
      end: to_date,
      color: {
        primary: color,
        secondary: color,
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    });
  }

  /**
   * Crear una entrada de usuario del calendario
   * @param userID - ID del usuario
   * @param start - Fecha de inicio
   * @param kg - Peso
   * @param repetitions - Repeticiones
   * @param series - Series
   * @param color - Color del evento
   * @param comment - Comentario
   */

  createUserEntry(userID: string, start: number, kg: number, repetitions: number, series: number, color: string, title: string, exerciseID: string,comment:string = null){
    const userEntriesRef = collection(this.database, 'userEntry');
    setDoc(doc(userEntriesRef), {
      userID: userID,
      start: start,
      kg: kg,
      repetitions: repetitions,
      series: series,
      color: {
        primary: color,
        secondary: color,
      },
      draggable: true,
      comment: comment,
      title: title,
      exerciseID: exerciseID,
    });
  }

  /**
   * Crear una rutina
   * @param title
   * @param photoURL
   */
  addRoutine(title: string, photoURL: string, userID: string, trainerID: string){
    const routinesRef = collection(this.database, 'routines');
    setDoc(doc(routinesRef), {
      title: title,
      photoURL: photoURL,
      userID: userID,
      trainerID: trainerID,
    });
  }

  /**
   * Crear un ejercicio
   * @param title
   * @param description
   * @param machineID
   * @param routineID
   */
  addExercise(title: string, description: string, machineID: string, routineID: string){
    const exercisesRef = collection(this.database, 'exercises');
    setDoc(doc(exercisesRef), {
      title: title,
      description: description,
      machineID: machineID,
      routineID: routineID,
    });
  }

  uploadForumMessage(message: string, date: number, isAdmin: boolean, isTrainer: boolean, photoURL: string, userID: string){
    const forumRef = collection(this.database, 'forumMessages');
    setDoc(doc(forumRef), {
      message: message,
      date: date,
      isAdmin: isAdmin,
      isTrainer: isTrainer,
      photoURL: photoURL,
      userID: userID,
    });
  }

// --------------------------------------------------------------------------------------------

  /**
   * Borrar una entrada de la base de datos a partir de su ID y tabla
   * @param table - Tabla de la base de datos
   * @param id - ID de la entrada
   */
  delete(table: string, id: string) {
    const ref = doc(this.database, table, id);
    deleteDoc(ref);
  }

  /**
   * Borrar un entrenador a partir de su ID de usuario
   * @param userID - ID de usuario
   */
  deleteTrainerWithUserID(userID: string){;
    this.getTrainerDocumentID(userID).then((id) => {
      this.delete('trainers', id);
    });
  }

  /**
   * Borrar un usuario a partir de su ID de usuario
   * @param userID - ID de usuario
   */
  deleteUserWithUserID(userID: string){
    this.getUserDocumentID(userID).then((id) => {
      this.delete('users', id);
    });
  }

  /**
   * Borrar las dietas asociadas a un usuario o entrenador
   * @param userID - ID de usuario
   */
  deleteDietsWithUserID(userID: string, isTrainer: boolean){
    const dietsRef = collection(this.database, 'diets');
    let q: any;
    if(isTrainer){
      q = query(dietsRef, where("trainerID", "==", userID));
    } else{
      q = query(dietsRef, where("userID", "==", userID));
    }
    const dietsQuery = getDocs(q);
    dietsQuery.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.delete('diets', doc.id);
      });
    });
  }

  /**
   * Borrar las rutinas asociadas a un usuario o entrenador
   * @param userID - ID de usuario
   */
  deleteRoutinesWithUserID(userID: string, isTrainer: boolean){
    const routinesRef = collection(this.database, 'routines');
    let q: any;
    if(isTrainer){
      q = query(routinesRef, where("trainerID", "==", userID));
    } else{
      q = query(routinesRef, where("userID", "==", userID));
    }
    const routinesQuery = getDocs(q);
    routinesQuery.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.delete('routines', doc.id);
      });
    });
  }

  /**
   * Borrar los mensajes del foro asociadas a un usuario o entrenador
   * @param userID - ID de usuario
   */
  deleteForumMessagesWithUserID(userID: string){
    const forumMessagesRef = collection(this.database, 'forumMessages');
    const q = query(forumMessagesRef, where("userID", "==", userID));
    const forumMessagesQuery = getDocs(q);
    forumMessagesQuery.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.delete('forumMessages', doc.id);
      });
    });
  }

  /**
   * Borrar las entradas de cita asociadas a un usuario o entrenador
   * @param userID - ID de usuario
   */
  deleteTrainerEntryWithUserID(userID: string, isTrainer: boolean){
    const trainerEntryRef = collection(this.database, 'trainerEntry');
    let q: any;
    if(isTrainer){
      q = query(trainerEntryRef, where("trainerID", "==", userID));
    } else{
      q = query(trainerEntryRef, where("userID", "==", userID));
    }
    const trainerEntryQuery = getDocs(q);
    trainerEntryQuery.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.delete('trainerEntry', doc.id);
      });
    });
  }

  /**
   * Borrar las entradas de usuario asociadas a un usuario
   * @param userID - ID de usuario
   */
  deleteUserEntryWithUserID(userID: string){
    const userEntryRef = collection(this.database, 'userEntry');
    const q = query(userEntryRef, where("userID", "==", userID));
    const userEntryQuery = getDocs(q);
    userEntryQuery.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.delete('userEntry', doc.id);
      });
    });
  }

  /**
   * Borrar todos los datos de un usuario o entrenador
   * @param userID
   * @param isTrainer
   */
  deleteUserData(userID: string, isTrainer: boolean){
    this.deleteDietsWithUserID(userID, isTrainer);
    this.deleteRoutinesWithUserID(userID, isTrainer);
    this.deleteForumMessagesWithUserID(userID);
    this.deleteTrainerEntryWithUserID(userID, isTrainer);
    this.deleteUserEntryWithUserID(userID);
  }
}
