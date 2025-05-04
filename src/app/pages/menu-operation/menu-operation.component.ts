import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarMainComponent } from '../../shared/navbar-main/navbar-main.component';
import { AuthService } from '../../core/auth.service';
import { map } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-menu-operation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarMainComponent],
  templateUrl: './menu-operation.component.html',
  styleUrls: ['./menu-operation.component.css']
})
export class MenuOperationComponent implements OnInit {
  supervisor: any;
  timeData: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadSupervisorData();
    this.loadTimeData();
  }

  loadSupervisorData() {
    this.authService.getUserData().pipe(
      map(user => ({
        name: user?.name ?? '',
        businessName: user?.businessName ?? ''
      }))
    ).subscribe(data => {
      this.supervisor = data;
    });
  }

  loadTimeData() {
    this.timeData = Timestamp.now().toDate();
  }
}
