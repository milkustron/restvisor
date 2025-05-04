import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, addDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

interface Reservation {
  id?: string;
  name: string;
  phone: string;
  time: string;
  guests: number;
  state: string;
  supervisorUid: string;
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
    state: 'Pending',
    supervisorUid: ''
  };

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
    const user = this.authService.currentUser;
    if (user) {
      const reservationsCollection = collection(this.firestore, 'reservations');
      const q = query(reservationsCollection, where('supervisorUid', '==', user.uid));
      this.reservations$ = collectionData(q, { idField: 'id' }) as Observable<Reservation[]>;
    } else {
      this.reservations$ = new Observable<Reservation[]>();
    }
  }

  ngOnInit(): void { }

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
    const user = this.authService.currentUser;
    this.newReservation = {
      name: '',
      phone: '',
      time: '',
      guests: 1,
      state: 'Pending',
      supervisorUid: user?.uid || ''
    };
  }

  async onAddReservation(): Promise<void> {
    const user = this.authService.currentUser;
    if (!user) return;

    const reservationsCollection = collection(this.firestore, 'reservations');
    await addDoc(reservationsCollection, {
      ...this.newReservation,
      supervisorUid: user.uid
    });
    this.resetNewReservation();
  }
}