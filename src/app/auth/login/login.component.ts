import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastService } from '../../helpers/services/system/toast.service';
import { AuthService } from '../../helpers/services/system/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName = '';
  password = '';
  isLoading: boolean = false;
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    private readonly toastService: ToastService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  login() {
    if (!this.loginForm.valid) {
      this.toastService.showError('Error', 'Revise los campos del formulario');
      return;
    }
    this.isLoading = true;
    this.authService.login(this.userName, this.password).subscribe({
      next: (res) => {
        const role = res.message.replace('ROLE_', '').toLowerCase();
        console.log(role);
        
        this.router.navigate([`/${role}`]);
        this.toastService.showSuccess('Éxito', 'Inicio de sesión exitoso');
        this.isLoading = false;
      },
      error: (res) => {
        this.toastService.showError('Error', res?.error?.message);
        this.isLoading = false;
      },
    });
  }
}
