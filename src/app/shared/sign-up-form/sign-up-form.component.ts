import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type UserRole = 'worker' | 'supervisor' ;

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
    extra?: any;
  }>();

  selectedRole: UserRole = 'supervisor';
  firstName: string = '';
  lastName: string = '';
  businessNameDefault = "no";
  businessDescDefault: string = "no";
  cifDefault: string = "no";

  onSubmit(form: any) {
    if (form.valid) {
      this.formSubmitted.emit({
        name: `${this.firstName} ${this.lastName}`,
        email: form.value.email,
        password: form.value.password,
        role: this.selectedRole,
        extra: {
          address: form.value.address,
          phone: form.value.phone,
          city: form.value.city,
          country: form.value.country,
          zip: form.value.zip,
          businessName: form.value.businessName || this.businessNameDefault,
          cif: form.value.cif || this.cifDefault,
          businessDesc: form.value.businessDesc || this.businessDescDefault,
        }
      });
    }
  }
}
