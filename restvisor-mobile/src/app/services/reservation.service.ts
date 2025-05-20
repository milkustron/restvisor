import { Injectable } from '@angular/core';
import { doc, getDoc } from 'firebase/firestore';
import { Firestore, docData } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private firestore: Firestore) {}

  getReservationById(id: string): Promise<any> {
    const ref = doc(this.firestore, `reservations/${id}`);
    return firstValueFrom(docData(ref));
  }
}
