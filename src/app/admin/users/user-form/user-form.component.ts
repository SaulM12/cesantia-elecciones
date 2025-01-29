import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../../../helpers/models/user/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../helpers/services/user/user.service';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { AuthService } from '../../../helpers/services/system/auth.service';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'user-form',
  imports: [FormsModule, InputText,Button,NgClass,SelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input() user: User = {} as User;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') stateSaved = new EventEmitter<User>();

  roleOptions = [
    {
      label: 'Administrador',
      role: {
        id: 1,
        name: 'ROLE_ADMIN',
      },
    },
    {
      label: 'Escáner',
      role: {
        id: 3,
        name: 'ROLE_ADMIN',
      },
    },
  ];

  edit: boolean = false;
  submitted: boolean = false;
  saveInProgress: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private readonly authService: AuthService
  ) {}

  ngOnChanges() {
    if (this.user?.id) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  save() {
    if (!this.form.valid) {
      this.toastService.showError('Error', 'Revise los campos del formulario');
      this.submitted = true;
      return;
    }
    this.saveInProgress = true;
    if (this.edit) {
      this.userService.update(this.user).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Usuario actualizado');
          this.saveInProgress = false;
          this.stateSaved.emit(this.user);
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    } else {
      let registerUser = {
        ci: this.user.ci,
        role: this.user.role,
        password: this.user.ci,
      };
      this.authService.registerUser(registerUser).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Usuario creado');
          this.saveInProgress = false;
          this.stateSaved.emit(this.user);
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    }
  }
}
