import {Component, OnInit} from '@angular/core';
import {NavbarMainComponent} from "../../shared/navbar-main/navbar-main.component";
import {ShiftsTableComponent} from "../../shared/shifts-table/shifts-table.component";
import {WorkerScheduleComponent} from "../../shared/worker-schedule/worker-schedule.component";
import {DatePipe} from "@angular/common";
import {AuthService} from "../../core/auth.service";
import {map} from "rxjs";
import {Timestamp} from "firebase/firestore";

@Component({
  selector: 'app-worker-profile',
    imports: [
        NavbarMainComponent,
        ShiftsTableComponent,
        WorkerScheduleComponent,
        DatePipe
    ],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent implements OnInit{

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
