import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarMainComponent } from '../../shared/navbar-main/navbar-main.component';
import { LoginModalComponent } from '../../shared/login-modal/login-modal.component';

@Component({
  selector: 'app-index',
  standalone: true,
    imports: [
        CommonModule,
        NavbarMainComponent,
        LoginModalComponent,
        RouterModule
    ],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent { }