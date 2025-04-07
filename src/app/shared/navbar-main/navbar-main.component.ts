import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-main',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.css']
})
export class NavbarMainComponent {}