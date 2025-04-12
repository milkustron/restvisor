import { Component } from '@angular/core';
import { ShiftsTableComponent } from '../../shared/shifts-table/shifts-table.component'
import { WorkerScheduleComponent } from '../../shared/worker-schedule/worker-schedule.component';

@Component({
  selector: 'app-worker',
  imports: [ShiftsTableComponent, WorkerScheduleComponent],
  templateUrl: './worker.component.html',
  styleUrl: './worker.component.css'
})
export class WorkerComponent {

}
