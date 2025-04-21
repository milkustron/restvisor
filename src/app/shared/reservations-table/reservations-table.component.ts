import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Reservation {
  id?: string;
  name: string;
  phone: string;
  time: string;
  guests: number;
  state: string;
}

@Component({
  selector: 'app-reservations-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {
  reservations$: Observable<Reservation[]>;
  newReservation: Reservation = {
    name: '',
    phone: '',
    time: '',
    guests: 1,
    state: 'Pending'
  };

  constructor(private firestore: Firestore) {
    const reservationsCollection = collection(this.firestore, 'reservations');
    this.reservations$ = collectionData(reservationsCollection, { idField: 'id' }) as Observable<Reservation[]>;
  }

  ngOnInit(): void {}

  async onConfirmReservation(reservation: Reservation): Promise<void> {
    if (!reservation.id) return;
    
    const reservationRef = doc(this.firestore, 'reservations', reservation.id);
    await updateDoc(reservationRef, {
      state: 'Confirmed'
    });
  }

  async onCancelReservation(reservation: Reservation): Promise<void> {
    if (!reservation.id) return;
    
    const reservationRef = doc(this.firestore, 'reservations', reservation.id);
    await updateDoc(reservationRef, {
      state: 'Cancelled'
    });
  }

  async onDeleteReservation(reservation: Reservation): Promise<void> {
    if (!reservation.id) return;
    
    const reservationRef = doc(this.firestore, 'reservations', reservation.id);
    await deleteDoc(reservationRef);
  }

  resetNewReservation(): void {
    this.newReservation = {
      name: '',
      phone: '',
      time: '',
      guests: 1,
      state: 'Pending'
    };
  }

  async onAddReservation(): Promise<void> {
    const reservationsCollection = collection(this.firestore, 'reservations');
    await addDoc(reservationsCollection, this.newReservation);
    this.resetNewReservation();
  }
}