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
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(public database: Firestore, public auth: AuthService) {}

  async getUserTrainer(userID: string) {
    const userRef = doc(this.database, 'users', userID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      if (userSnap.data()['trainerID'] != null) {
        return userSnap.data()['trainerID'];
      }
    }
  }

  getRoutines(user: string): Observable<any[]> {
    const routinesRef = collection(this.database, 'routines');
    const q = query(routinesRef, where('userID', '==', user));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
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
