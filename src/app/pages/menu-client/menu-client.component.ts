import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarMainComponent } from '../../shared/navbar-main/navbar-main.component';
import { AuthService } from '../../core/auth.service';
import { PlatesService, Plate } from '../../core/plates.service';
import { map } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-menu-client',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarMainComponent],
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.css']
})
export class MenuClientComponent implements OnInit {
  supervisor: any;
  timeData: any;
  menuItems: Plate[] = [];
  selectedCategory: string = '';

  constructor(
    private authService: AuthService,
    private platesService: PlatesService
  ) { }

  ngOnInit(): void {
    this.loadSupervisorData();
    this.loadTimeData();
  }

  loadSupervisorData() {
    this.authService.getUserData().pipe(
      map(user => ({
        name: user?.name ?? '',
        businessName: user?.businessName ?? '',
        uid: user?.uid ?? ''
      }))
    ).subscribe(async data => {
      this.supervisor = data;
      await this.loadMenuItems();
    });
  }

  loadTimeData() {
    this.timeData = Timestamp.now().toDate();
  }

  async loadMenuItems() {
    try {
      if (this.supervisor?.uid) {
        this.menuItems = await this.platesService.getPlatesBySupervisor(this.supervisor.uid);
        console.log('Platos cargados:', this.menuItems);
      }
    } catch (error) {
      console.error('Error al cargar los platos:', error);
    }
  }

  getCategories(): string[] {
    return [...new Set(this.menuItems.map(item => item.category))];
  }

  getFilteredItems(): Plate[] {
    if (!this.selectedCategory) {
      return this.menuItems.filter(item => item.available);
    }
    return this.menuItems.filter(item => item.available && item.category === this.selectedCategory);
  }
}
