import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Unit } from '../../../helpers/models/organization/unit';
import { UnitService } from '../../../helpers/services/organization/unit.service';
import { ToastService } from '../../../helpers/services/system/toast.service';

@Component({
  selector: 'unit-form',
  imports: [FormsModule, InputText, NgClass, Button],
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.scss',
})
export class UnitFormComponent {
  edit: boolean = false;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  @Input('unit') unit: Unit = {} as Unit;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') stateSaved = new EventEmitter<Unit>();

  constructor(
    private readonly unitService: UnitService,
    private readonly toastService: ToastService
  ) {}

  ngOnChanges() {
    if (this.unit?.id) {
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
      this.unitService.update(this.unit).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Unidad actualizada');
          this.saveInProgress = false;
          this.stateSaved.emit(this.unit);
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    } else {
      this.unitService.create(this.unit).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Unidad creada');
          this.saveInProgress = false;
          this.stateSaved.emit(this.unit);
        },

        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    }
  }
}
