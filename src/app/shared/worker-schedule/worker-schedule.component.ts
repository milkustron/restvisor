import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worker-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-schedule.component.html',
  styleUrls: ['./worker-schedule.component.css']
})
export class WorkerScheduleComponent {
  schedule = [
    { day: 'Monday', start: '09:00', finish: '17:00' },
    { day: 'Tuesday', start: '10:00', finish: '18:00' },
    { day: 'Wednesday', start: '08:30', finish: '16:30' }
  ];
}
