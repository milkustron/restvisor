import {Component, OnInit} from '@angular/core';
import { ShiftsTableComponent } from '../../shared/shifts-table/shifts-table.component'
import { WorkerScheduleComponent } from '../../shared/worker-schedule/worker-schedule.component';
import {NavbarMainComponent} from "../../shared/navbar-main/navbar-main.component";
import {AuthService} from "../../core/auth.service";
import {map} from "rxjs";
import { Timestamp } from 'firebase/firestore';
import {  DatePipe } from "@angular/common";

@Component({
  selector: 'app-worker',
  standalone: true,
  imports: [ShiftsTableComponent, WorkerScheduleComponent, NavbarMainComponent, DatePipe],
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit{

  worker: any;
  timeData: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
        this.loadEmployeeData()
    this.loadTimeData()
    }

  loadEmployeeData() {
    this.authService.getUserData().pipe(
        map(user => ({
          name: user?.name ?? '',
          role: user?.role ?? ''
        }))
    ).subscribe(data => {
      this.worker = data;
    });
  }


  loadTimeData() {
    this.timeData = Timestamp.now().toDate();
  }






}
