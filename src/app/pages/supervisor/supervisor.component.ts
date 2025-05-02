import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarMainComponent } from '../../shared/navbar-main/navbar-main.component';
import { ReservationsTableComponent } from '../../shared/reservations-table/reservations-table.component';
import {GenericModalComponent} from "../../shared/generic-modal/generic-modal.component";
import {ActiveWorkersComponent} from "../../shared/active-workers/active-workers.component";


@Component({
  selector: 'app-supervisor',
  standalone: true,
    imports: [CommonModule, NavbarMainComponent, ReservationsTableComponent, GenericModalComponent, ActiveWorkersComponent],
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent {
  onConfirmReservation() {
    console.log('✅ Reserva confirmada');
  }

  onCancelReservation() {
    console.log('❌ Reserva cancelada');
  }

  onDeleteReservation() {
    console.log('🗑️ Reserva eliminada');
  }
}

