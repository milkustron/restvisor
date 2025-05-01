import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../core/auth.service";
import {DatabaseService} from "../../services/database/database.service";
import { doc, Firestore, getDoc} from "@angular/fire/firestore";


@Component({
  selector: 'app-worker-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-schedule.component.html',
  styleUrls: ['./worker-schedule.component.css']
})
export class WorkerScheduleComponent implements OnInit {
  schedule: any[] = [];

  constructor(private authService: AuthService,
              private databaseService: DatabaseService,
              private firestore: Firestore
  ) {
  }

  ngOnInit(): void {
    this.loadSchedule()
  }

  async loadSchedule() {
    const user = this.authService.currentUser;
    if (!user) return;

    const employeeId = user.uid;
    const scheduleDocRef = doc(this.firestore, 'workerSchedule', employeeId);
    const docSnap = await getDoc(scheduleDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.schedule = [data['schedule']];
    }

  }
}
