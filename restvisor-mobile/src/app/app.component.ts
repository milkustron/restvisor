import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  construct,
} from 'ionicons/icons';

import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { DetailsComponent } from '../app/details/details.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    DetailsComponent,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  public appPages = [{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' }];
  public isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
