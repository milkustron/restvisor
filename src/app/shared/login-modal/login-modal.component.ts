import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.error = '';
      // Cierra el modal manualmente si lo deseas
    }).catch((err) => {
      this.error = err.message;
    });
  }
}