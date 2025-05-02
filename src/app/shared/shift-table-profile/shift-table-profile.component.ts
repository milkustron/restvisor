import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import {Firestore, collection, getDocs} from '@angular/fire/firestore';
import {CommonModule, DatePipe} from "@angular/common";
@Component({
  selector: 'app-shift-table-profile',
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './shift-table-profile.component.html',
  styleUrl: './shift-table-profile.component.css'
})
export class ShiftTableProfileComponent implements OnInit {
  shifts: any[] = [];

  constructor(
      private authService: AuthService,
      private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.loadShifts();
  }

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
  }

}
