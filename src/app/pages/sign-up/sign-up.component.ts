import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignUpFormComponent, UserRole} from "../../shared/sign-up-form/sign-up-form.component";
import {Router} from "@angular/router";
import {NavbarMainComponent} from "../../shared/navbar-main/navbar-main.component";
import { AuthService } from  "../../core/auth.service"

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, NavbarMainComponent], // importa tu formulario standalone
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  async onFormSubmit(data: { name: string; email: string; password: string; role: UserRole; extra?: any }) {
    this.errorMessage = null;
    try {
      await this.authService.register(data.email, data.password,  {
        role: data.role,
        name: data.name,
        ...data.extra
      });

      switch (data.role) {
        case 'supervisor':
          await this.router.navigate(['/supervisor']);
          break;
        case 'worker':
          await this.router.navigate(['/worker']);
          break;
        default:
          await this.router.navigate(['/']);
      }
    } catch (error: any) {
      console.error('Error during registration:', error);
      this.errorMessage = this.getFriendlyError(error.code);
    }
  }


  private getFriendlyError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use';
      case 'auth/invalid-email':
        return 'Invalid email';
      case 'auth/weak-password':
        return 'Weak password must be at least 6 characters';
      default:
        return 'An unexpected error has occurred. Please try again.';
    }
  }



}