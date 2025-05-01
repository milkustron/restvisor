import { Component } from '@angular/core';
import { ShiftsTableComponent } from '../../shared/shifts-table/shifts-table.component'
import { WorkerScheduleComponent } from '../../shared/worker-schedule/worker-schedule.component';
import {NavbarMainComponent} from "../../shared/navbar-main/navbar-main.component";

@Component({
  selector: 'app-worker',
  standalone: true,
  imports: [ShiftsTableComponent, WorkerScheduleComponent, NavbarMainComponent],
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {

}
