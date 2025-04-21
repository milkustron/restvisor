import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type UserRole = 'employee' | 'supervisor' | 'admin';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  @Output() formSubmitted = new EventEmitter<{ 
    name: string; 
    email: string; 
    password: string;
    role: UserRole;
  }>();
  
  roles: { value: UserRole; label: string }[] = [
    { value: 'employee', label: 'Empleado' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'admin', label: 'Administrador' }
  ];
  
  onSubmit(form: any) {
    if (form.valid) {
      this.formSubmitted.emit({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        role: form.value.role
      });
    }
  }
}