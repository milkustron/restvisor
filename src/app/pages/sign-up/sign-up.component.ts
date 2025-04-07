import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignUpFormComponent} from "../../shared/sign-up-form/sign-up-form.component";
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

  async onFormSubmit(data: { name: string; email: string; password: string }) {
    try {
      await this.authService.register(data.email, data.password, { name: data.name });
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
    }
  }
}