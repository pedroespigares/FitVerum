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
  getDocs,
  updateDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(public database: Firestore, public auth: AuthService) {}

  // Getters

  async getUserTrainer(userID: string) {
    const userRef = doc(this.database, 'users', userID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      if (userSnap.data()['trainerID'] != null) {
        return userSnap.data()['trainerID'];
      }
    }
  }

  getUsers(): Observable<any[]> {
    const usersRef = collection(this.database, 'users');
    return collectionData(usersRef, { idField: 'id' }) as Observable<any[]>;
  }

  async getUserData(userID: string) {
    const userRef = doc(this.database, 'users', userID);
    const docSnap = await getDoc(userRef);
    if(docSnap.exists()){
      return docSnap.data();
    } else {
      return null;
    }
  }

  getUsersWithoutTrainer(): Observable<any[]> {
    const usersRef = collection(this.database, 'users');
    const q = query(usersRef, where('trainerID', '==', null));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getTrainers(): Observable<any[]> {
    const trainersRef = collection(this.database, 'trainers');
    return collectionData(trainersRef, { idField: 'id' }) as Observable<any[]>;
  }

  async getTrainerData(trainerID: string) {
    const trainerRef = doc(this.database, 'trainers', trainerID);
    const docSnap = await getDoc(trainerRef);
    if(docSnap.exists()){
      return docSnap.data();
    } else {
      return null;
    }
  }
  getTrainerClients(trainerID: string): Observable<any[]> {
    const usersRef = collection(this.database, 'users');
    const q = query(usersRef, where('trainerID', '==', trainerID));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getRoutines(user: string): Observable<any[]> {
    const routinesRef = collection(this.database, 'routines');
    const q = query(routinesRef, where('userID', '==', user));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getMachines(): Observable<any[]> {
    const machinesRef = collection(this.database, 'machines');
    return collectionData(machinesRef, { idField: 'id' }) as Observable<any[]>;
  }

  async getMachineByID(id: string) {
    const machineRef = doc(this.database, 'machines', id);
    const docSnap = await getDoc(machineRef);
    return docSnap.data();
  }

  // En los convert lo que hacemos es "traspasar" los datos de un documento a otro

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

  // Convertir un usuario en cliente de un entrenador
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

  // Quitar a un usuario de la lista de clientes de un entrenador
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

// Metodos de eliminacion de usuarios y entrenadores


  deleteUser(id: string) {
    const userRef = doc(this.database, 'users', id);
    deleteDoc(userRef);
  }

  deleteTrainer(id: string) {
    const trainerRef = doc(this.database, 'trainers', id);
    deleteDoc(trainerRef);
  }


  // Update de datos de usuarios y entrenadores

  updateDisplayName(id: string, displayName: string) {
    const userRef = doc(this.database, 'users', id);
    updateDoc(userRef, {
      displayName: displayName,
    });
  }

  updatePhotoURL(id: string, photoURL: string) {
    const userRef = doc(this.database, 'users', id);
    updateDoc(userRef, {
      photoURL: photoURL,
    });
  }

  updateEmail(id: string, email: string) {
    const userRef = doc(this.database, 'users', id);
    updateDoc(userRef, {
      email: email,
    });
  }

  // Metodos para las maquinas

  
  addMachine(name: string, description: string, photoURL: string) {
    const machinesRef = collection(this.database, 'machines');
    setDoc(doc(machinesRef), {
      name: name,
      description: description,
      photoURL: photoURL,
    });
  }

  updateMachine(id: string, name: string, description: string, photoURL: string) {
    const machineRef = doc(this.database, 'machines', id);
    updateDoc(machineRef, {
      name: name,
      description: description,
      photoURL: photoURL,
    });
  }

  deleteMachine(id: string) {
    const machineRef = doc(this.database, 'machines', id);
    deleteDoc(machineRef);
  }


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

  updateAppointmentDates(id: string, from_date: number, to_date: number){
    const appointmentRef = doc(this.database, 'trainerEntry', id);
    updateDoc(appointmentRef, {
      start: from_date,
      end: to_date,
    });
  }

  getAppointmentsOfTrainer(trainerID: string): Observable<any[]> {
    const appointmentsRef = collection(this.database, 'trainerEntry');
    const q = query(appointmentsRef, where('trainerID', '==', trainerID));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  deleteAppointment(id: string) {
    const appointmentRef = doc(this.database, 'trainerEntry', id);
    deleteDoc(appointmentRef);
  }


// hay que sacar el trainer a partir del user
//   getRoutinesWithUserAndTrainer(user: string, trainer: string) {
//     const routinesRef = collection(this.database, 'routines');
//     const q = query(
//       routinesRef,
//       where('user', '==', user),
//       where('trainer', '==', trainer)
//     );
//     return collectionData(q, { idField: 'id' }) as Observable<any[]>;
//   }
}
