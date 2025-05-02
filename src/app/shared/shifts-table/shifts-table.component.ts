import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../services/shifts/shift.service';
import { AuthService } from '../../core/auth.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule, DatePipe } from "@angular/common";

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
  shifts: any[] = [];
  isClockedIn: boolean = false;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.loadShifts();
  }

  // Cargar los turnos del trabajador desde Firestore


  async loadShifts() {
    const user = this.authService.currentUser;
    if (!user) return;

    const employeeId = user.uid;
    const shiftsCollectionRef = collection(this.firestore, 'workerShifts', employeeId, 'shifts');
    const querySnapshot = await getDocs(shiftsCollectionRef);

    this.shifts = querySnapshot.docs.map(doc => ({
      shiftId: doc.id,
      ...doc.data()
    }));
    console.log()
  }


  // Llamar al servicio para hacer clock in
  async clockIn() {
    await this.shiftService.clockIn();
    this.isClockedIn = true;
    this.loadShifts(); // Recargar los turnos para mostrar el nuevo
  }

  // Llamar al servicio para hacer clock out
  async clockOut(shiftId: string) {
    await this.shiftService.clockOut(shiftId);
    this.isClockedIn = false;
    this.loadShifts(); // Recargar los turnos para mostrar el cambio
  }


}
