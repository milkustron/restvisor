import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { IonRouterOutlet, IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, 
    CommonModule,
    IonRouterOutlet
  ]
})
export class AppComponent {
  public appPages = [{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' }];
  public isLoggedIn = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout(); 
  }
}
