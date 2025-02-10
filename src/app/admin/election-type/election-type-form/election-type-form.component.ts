import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ElectionType } from '../../../helpers/models/elections/election-type';
import { FormsModule, NgForm } from '@angular/forms';
import { ElectionTypeService } from '../../../helpers/services/elections/election-type.service';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'election-type-form',
  imports: [FormsModule, Button, InputText, NgClass, ToggleSwitchModule],
  templateUrl: './election-type-form.component.html',
  styleUrl: './election-type-form.component.scss',
})
export class ElectionTypeFormComponent {
  edit: boolean = false;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  electionTypes: ElectionType[] = [];
  @Input('electionType') electionType: ElectionType = {} as ElectionType;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') quadrantSaved = new EventEmitter<ElectionType>();

  constructor(
    private readonly electionTypeService: ElectionTypeService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.electionType?.id) {
      this.edit = true;
    } else {
      this.edit = false;
      this.electionType.enabled = false;
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
      this.electionTypeService
        .updateElectionType(this.electionType.id, this.electionType)
        .subscribe({
          next: () => {
            this.toastService.showSuccess('Éxito', 'Tipo de elección actualizado');
            this.saveInProgress = false;
            this.quadrantSaved.emit(this.electionType);
          },
          error: (err) => {
            this.toastService.showError('Error', err.error?.message);
            this.saveInProgress = false;
          },
        });
    } else {
      this.electionTypeService.createElectionType(this.electionType).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Tipo de elección creado');
          this.saveInProgress = false;
          this.quadrantSaved.emit(this.electionType);
        },

        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    }
  }
}
