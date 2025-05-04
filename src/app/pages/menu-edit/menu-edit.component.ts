import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarMainComponent } from '../../shared/navbar-main/navbar-main.component';
import { AuthService } from '../../core/auth.service';
import { PlatesService, Plate } from '../../core/plates.service';
import { map } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarMainComponent, FormsModule],
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  supervisor: any;
  timeData: any;
  menuItems: Plate[] = [];
  newItem: Plate = {
    name: '',
    description: '',
    price: 0,
    category: '',
    available: true,
    supervisorUid: ''
  };
  editingItem: Plate | null = null;
  isEditing: boolean = false;

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
      this.newItem.supervisorUid = data.uid;
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

  async addMenuItem() {
    if (this.newItem.name && this.newItem.description && this.newItem.price > 0) {
      try {
        await this.platesService.addPlate(this.newItem);
        await this.loadMenuItems();
        this.resetNewItem();
      } catch (error) {
        console.error('Error al añadir el plato:', error);
      }
    }
  }

  resetNewItem() {
    this.newItem = {
      name: '',
      description: '',
      price: 0,
      category: '',
      available: true,
      supervisorUid: this.supervisor.uid
    };
  }

  startEditing(item: Plate) {
    this.editingItem = { ...item };
    this.isEditing = true;
  }

  cancelEditing() {
    this.editingItem = null;
    this.isEditing = false;
  }

  async saveEdit() {
    if (this.editingItem && this.editingItem.id) {
      try {
        await this.platesService.updatePlate(this.editingItem.id, {
          name: this.editingItem.name,
          description: this.editingItem.description,
          price: this.editingItem.price,
          category: this.editingItem.category,
          available: this.editingItem.available
        });
        await this.loadMenuItems();
        this.cancelEditing();
      } catch (error) {
        console.error('Error al actualizar el plato:', error);
      }
    }
  }

  async toggleAvailability(item: Plate) {
    if (item.id) {
      try {
        await this.platesService.togglePlateAvailability(item.id, !item.available);
        await this.loadMenuItems();
      } catch (error) {
        console.error('Error al cambiar la disponibilidad:', error);
      }
    }
  }

  async deleteItem(item: Plate) {
    if (item.id) {
      try {
        await this.platesService.deletePlate(item.id);
        await this.loadMenuItems();
      } catch (error) {
        console.error('Error al eliminar el plato:', error);
      }
    }
  }
}
