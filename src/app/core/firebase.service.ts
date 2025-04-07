import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
    constructor(private firestore: Firestore) {}

    getReservations(): Observable<any[]> {
        const ref = collection(this.firestore, 'reservations');
        return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
    }

    confirmReservation(id: string) {
        const ref = doc(this.firestore, `reservations/${id}`);
        return updateDoc(ref, { status: 'confirmed' });
    }

    cancelReservation(id: string) {
        const ref = doc(this.firestore, `reservations/${id}`);
        return updateDoc(ref, { status: 'cancelled' });
    }

    deleteReservation(id: string) {
        const ref = doc(this.firestore, `reservations/${id}`);
        return deleteDoc(ref);
    }
}