import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc, getDoc, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private firestore: Firestore, private authService: AuthService, private router: Router) {}

  // Método para agregar un nuevo turno
  async clockIn() {
    const user = this.authService.currentUser;
    if (!user) {
      return;
    }

    console.log();

    const employeeId = user.uid;
    const shiftId = this.generateShiftId();

    const shiftData = {
      date: Timestamp.fromDate(new Date()), // Fecha actual
      start: Timestamp.fromDate(new Date()), // Hora de inicio
      end: '', // El final del turno se llenará cuando se haga el clock-out
      total: '0h', // Total, se actualizará al hacer el clock-out
      state: 'ongoing', // Estado inicial
    };

    // Añadir el turno en la subcolección de 'shifts' del trabajador
    const workerRef = doc(this.firestore, 'workerShifts', employeeId);

    await setDoc(workerRef, { employeeId }, { merge: true });

    const shiftsRef = doc(workerRef, 'shifts', shiftId);

    await setDoc(shiftsRef, shiftData);
  }

  // Método para hacer el clock-out (finalizar turno)
  async clockOut(shiftId: string) {
    const user = this.authService.currentUser;
    if (!user) {
      return;
    }

    const employeeId = user.uid;
    const shiftRef = doc(this.firestore, 'workerShifts', employeeId, 'shifts', shiftId);

    // Obtener el turno para actualizarlo
    const shiftDoc = await getDoc(shiftRef);
    if (!shiftDoc.exists()) {
      return;
    }

    const shiftData = shiftDoc.data();
    const endTimestamp = Timestamp.fromDate(new Date());

    // Calcular el tiempo total (en horas)
    const start = shiftData?.['start'].toDate();
    const total = this.calculateTotalHours(start, endTimestamp.toDate());

    // Actualizar el estado y tiempo total
    await updateDoc(shiftRef, {
      end: endTimestamp,
      total,
      state: 'finished',
    });
  }

  // Calcular las horas entre el inicio y el fin
  calculateTotalHours(start: Date, end: Date): string {
    const diff = end.getTime() - start.getTime();
    const hours = diff / (1000 * 3600); // Convertir a horas
    return `${hours.toFixed(2)}h`; // Redondear a dos decimales
  }

  // Generar un ID único para cada turno (puedes usar un timestamp o algo más complejo)
  generateShiftId(): string {
    return `shift_${new Date().getTime()}`;
  }

}
