import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, UserRole } from 'src/app/auth/auth.service';

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  businessName: string;
}

@Component({
  selector: 'app-navbar-main',
  standalone: true,
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.scss'], 
    imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
})
export class NavbarMainComponent implements OnInit {
  user$!: Observable<UserData | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUserData();
  }

  logout() {
    this.authService.logout();
  }
}
