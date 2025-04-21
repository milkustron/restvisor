import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarMainComponent } from '../../shared/navbar-main/navbar-main.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NavbarMainComponent],
  template: `
    <app-navbar-main></app-navbar-main>
    <div class="container mt-4">
      <h1>Panel de Administrador</h1>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Gestión de Usuarios</h5>
              <p class="card-text">Administra los usuarios del sistema.</p>
              <button class="btn btn-primary">Gestionar Usuarios</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Configuración</h5>
              <p class="card-text">Configura los parámetros del sistema.</p>
              <button class="btn btn-primary">Configurar</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Reportes Generales</h5>
              <p class="card-text">Visualiza reportes del sistema.</p>
              <button class="btn btn-primary">Ver Reportes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {} 