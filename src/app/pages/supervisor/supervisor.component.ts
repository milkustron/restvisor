import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarMainComponent } from '../../shared/navbar-main/navbar-main.component';
import { ReservationsTableComponent } from '../../shared/reservations-table/reservations-table.component';
import {GenericModalComponent} from "../../shared/generic-modal/generic-modal.component";
import {ActiveWorkersComponent} from "../../shared/active-workers/active-workers.component";
import {AuthService} from "../../core/auth.service";
import {map} from "rxjs";
import {Timestamp} from "firebase/firestore";


@Component({
  selector: 'app-supervisor',
  standalone: true,
    imports: [CommonModule, NavbarMainComponent, ReservationsTableComponent, GenericModalComponent, ActiveWorkersComponent],
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
    supervisor: any;
  timeData: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadSupervisorData()
    this.loadTimeData()
  }

  onConfirmReservation() {
    console.log('✅ Reserva confirmada');
  }

  onCancelReservation() {
    console.log('❌ Reserva cancelada');
  }

  onDeleteReservation() {
    console.log('🗑️ Reserva eliminada');
  }

  loadSupervisorData() {
    this.authService.getUserData().pipe(
        map(user => ({
          name: user?.name ?? '',
          businessName: user?.businessName  ?? ''
        }))
    ).subscribe(data => {
      this.supervisor = data;
    });
  }


  loadTimeData() {
    this.timeData = Timestamp.now().toDate();
  }


}

