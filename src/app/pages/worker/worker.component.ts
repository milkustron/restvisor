import { Component } from '@angular/core';
import { ShiftsTableComponent } from '../../shared/shifts-table/shifts-table.component'

@Component({
  selector: 'app-worker',
  imports: [ShiftsTableComponent],
  templateUrl: './worker.component.html',
  styleUrl: './worker.component.css'
})
export class WorkerComponent {

}
