import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
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
   * Obtener todas las máquinas
   * @returns - Observable con todas las máquinas
   */
  getMachines(): Observable<any[]> {
    const machinesRef = collection(this.database, 'machines');
    return collectionData(machinesRef, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Obtener las rutinas de un cliente
   * @param clientID - ID del cliente
   * @returns - Observable con las rutinas del cliente
   */
  getClientRoutines(clientID: string): Observable<any[]> {
    const routinesRef = collection(this.database, 'routines');
    const q = query(routinesRef, where('userID', '==', clientID));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
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
        setDoc(userRef, {
          userID: doc.data()['userID'],
          displayName: doc.data()['displayName'],
          photoURL: doc.data()['photoURL'],
          trainerID: trainerID,
          timestamp: doc.data()['timestamp'],
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
        setDoc(userRef, {
          userID: doc.data()['userID'],
          displayName: doc.data()['displayName'],
          photoURL: doc.data()['photoURL'],
          trainerID: null,
          timestamp: doc.data()['timestamp'],
        });
      }
    });
  }
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// Updates


  /**
   * Actualizar el nombre de un usuario
   * @param id - ID del usuario
   * @param displayName - Nombre a actualizar
   */
  updateDisplayName(id: string, displayName: string) {
    const userRef = doc(this.database, 'users', id);
    updateDoc(userRef, {
      displayName: displayName,
    });
  }

  /**
   * Actualizar la foto de perfil de un usuario
   * @param id - ID del usuario
   * @param photoURL - URL de la foto a actualizar
   */
  updatePhotoURL(id: string, photoURL: string) {
    const userRef = doc(this.database, 'users', id);
    updateDoc(userRef, {
      photoURL: photoURL,
    });
  }


  /**
   * Actualizar el email de un usuario
   * @param id - ID del usuario
   * @param email - Email a actualizar
   */
  updateEmail(id: string, email: string) {
    const userRef = doc(this.database, 'users', id);
    updateDoc(userRef, {
      email: email,
    });
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

  createUserEntry(userID: string, start: number, kg: number, repetitions: number, series: number, color: string, title: string, comment:string = null){
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
}
