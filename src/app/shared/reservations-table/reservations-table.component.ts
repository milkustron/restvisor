import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Reservation {
  name: string;
  phone: string;
  time: string;
  guests: number;
  state: string;
}

@Component({
  selector: 'app-reservations-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent {
  reservations: Reservation[] = [
    {
      name: 'John Doe',
      phone: '+34 123456789',
      time: '20:00',
      guests: 4,
      state: 'Pending'
    }
  ];

  onConfirmReservation(reservation: Reservation): void {
    reservation.state = 'Confirmed';
  }

  onCancelReservation(reservation: Reservation): void {
    reservation.state = 'Cancelled';
  }

  onDeleteReservation(reservation: Reservation): void {
    this.reservations = this.reservations.filter(r => r !== reservation);
  }
}