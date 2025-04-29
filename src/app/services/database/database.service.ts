import { Injectable } from '@angular/core';
import { collectionData, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { collection } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Reservation } from '../../models/reservation-model';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) { }

  getReservations() {
    const reservationsCollection = collection(this.firestore, 'reservations');
    return collectionData(reservationsCollection);
  }

  getReservationById(id: string) {
    const reservationDoc = doc(this.firestore, `reservations/${id}`);
    return docData(reservationDoc);
  }

  updateReservation(id: string, reservation: Reservation) {
    const reservationDoc = doc(this.firestore, `reservations/${id}`);
    return updateDoc(reservationDoc, { ...reservation });
  }

  deleteReservation(id: string) {
    const reservationDoc = doc(this.firestore, `reservations/${id}`);
    return deleteDoc(reservationDoc);
  }

  getShifts() {
    const workerShiftsCollection = collection(this.firestore, 'workerShifts');
    return collectionData(workerShiftsCollection);
  }

  getShiftById(id: string) {
    const workerShiftsCollection = doc(this.firestore, `workerShifts/${id}`);
    return docData(workerShiftsCollection);
  }

  updateShift(id: string, shift: Reservation) {
    const workerShiftsCollection = doc(this.firestore, `workerShifts/${id}`);
    return updateDoc(workerShiftsCollection, { ...shift });
  }

  deleteShift(id: string) {
    const workerShiftsCollection = doc(this.firestore, `workerShifts/${id}`);
    return deleteDoc(workerShiftsCollection);
  }

}
