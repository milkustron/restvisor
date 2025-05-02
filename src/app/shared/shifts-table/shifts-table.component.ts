import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../services/shifts/shift.service';
import { AuthService } from '../../core/auth.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule, DatePipe } from "@angular/common";
import { Timestamp } from 'firebase/firestore';

interface Shift {
  shiftId: string;
  date: Timestamp | null;
  start: Timestamp | null;
  end: Timestamp | null;
  total: string;
  state: 'ongoing' | 'finished';
}

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  imports: [
    DatePipe,
    CommonModule
  ],
  styleUrls: ['./shifts-table.component.css']
})
export class ShiftsTableComponent implements OnInit {
  shifts: Shift[] = [];
  isClockedIn: boolean = false;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.loadShifts();
  }

  async loadShifts() {
    const user = this.authService.currentUser;
    if (!user) {
      console.log('No hay usuario autenticado');
      return;
    }

    const employeeId = user.uid;
    const shiftsCollectionRef = collection(this.firestore, 'workerShifts', employeeId, 'shifts');

    try {
      const querySnapshot = await getDocs(shiftsCollectionRef);
      console.log('Documentos encontrados:', querySnapshot.docs.length);

      this.shifts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Datos del documento:', data);

        return {
          shiftId: doc.id,
          date: data['date'] || null,
          start: data['start'] || null,
          end: data['end'] || null,
          total: data['total'] || '0h',
          state: data['state'] || 'finished'
        };
      });

      console.log('Turnos cargados:', this.shifts);
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
    }
  }


  // Llamar al servicio para hacer clock in
  async clockIn() {
    try {
      await this.shiftService.clockIn();
      this.isClockedIn = true;
      await this.loadShifts();
    } catch (error) {
      console.error('Error al hacer clock in:', error);
    }
  }

  // Llamar al servicio para hacer clock out
  async clockOut(shiftId: string) {
    try {
      await this.shiftService.clockOut(shiftId);
      this.isClockedIn = false;
      await this.loadShifts();
    } catch (error) {
      console.error('Error al hacer clock out:', error);
    }
  }
}
