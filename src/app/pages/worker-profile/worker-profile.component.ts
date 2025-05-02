import { Component } from '@angular/core';
import {NavbarMainComponent} from "../../shared/navbar-main/navbar-main.component";
import {ShiftsTableComponent} from "../../shared/shifts-table/shifts-table.component";
import {WorkerScheduleComponent} from "../../shared/worker-schedule/worker-schedule.component";

@Component({
  selector: 'app-worker-profile',
  imports: [
    NavbarMainComponent,
    ShiftsTableComponent,
    WorkerScheduleComponent
  ],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent {

}
