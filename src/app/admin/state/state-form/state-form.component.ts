import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { State } from '../../../helpers/models/system/state';
import { StateService } from '../../../helpers/services/system/state.service';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'state-form',
  imports: [FormsModule, InputText, NgClass, Button],
  templateUrl: './state-form.component.html',
  styleUrl: './state-form.component.scss',
})
export class StateFormComponent {
  edit: boolean = false;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  @Input('state') state: State = {} as State;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') stateSaved = new EventEmitter<State>();

  constructor(
    private readonly stateService: StateService,
    private readonly toastService: ToastService
  ) {}

  ngOnChanges() {
    if (this.state?.id) {
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
      this.stateService.update(this.state).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Estado actualizado');
          this.saveInProgress = false;
          this.stateSaved.emit(this.state);
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    } else {
      this.stateService.create(this.state).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Estado creado');
          this.saveInProgress = false;
          this.stateSaved.emit(this.state);
        },

        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    }
  }
}
