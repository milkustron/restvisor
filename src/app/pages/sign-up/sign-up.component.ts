import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignUpFormComponent, UserRole} from "../../shared/sign-up-form/sign-up-form.component";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {NavbarMainComponent} from "../../shared/navbar-main/navbar-main.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, NavbarMainComponent], // importa tu formulario standalone
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async onFormSubmit(data: { name: string; email: string; password: string; role: UserRole }) {
    try {
      await this.authService.register(data.email, data.password, { 
        name: data.name,
        role: data.role
      });

      // Redirigir según el rol
      switch (data.role) {
        case 'admin':
          await this.router.navigate(['/admin-dashboard']);
          break;
        case 'supervisor':
          await this.router.navigate(['/supervisor']);
          break;
        case 'employee':
          await this.router.navigate(['/worker']);
          break;
        default:
          await this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
}