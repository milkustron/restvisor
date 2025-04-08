import { Component } from '@angular/core';

@Component({
  selector: 'app-shifts-table',
  imports: [],
  templateUrl: './shifts-table.component.html',
  styleUrl: './shifts-table.component.css'
})
export class ShiftsTableComponent {
  shifts = [
    { date: '2025-04-01', start: '09:00', end: '17:00', total: '8h' },
    { date: '2025-04-02', start: '10:00', end: '18:00', total: '8h' },
    { date: '2025-04-03', start: '08:30', end: '16:30', total: '8h' },
  ];
}
