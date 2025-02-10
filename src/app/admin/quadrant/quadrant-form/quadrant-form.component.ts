import { ElectionTypeService } from './../../../helpers/services/elections/election-type.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Quadrant } from '../../../helpers/models/organization/quadrant';
import { QuadrantService } from '../../../helpers/services/organization/quadrant.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { ElectionType } from '../../../helpers/models/elections/election-type';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumber } from 'primeng/inputnumber';
@Component({
  selector: 'quadrant-form',
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    NgClass,
    MultiSelectModule,
    InputNumber
  ],
  templateUrl: './quadrant-form.component.html',
  styleUrl: './quadrant-form.component.scss',
})
export class QuadrantFormComponent {
  edit: boolean = false;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  @Input('electionTypes') electionTypes: ElectionType[] = [];
  @Input('quadrant') quadrant: Quadrant = {} as Quadrant;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') quadrantSaved = new EventEmitter<Quadrant>();

  constructor(
    private readonly quadrantService: QuadrantService,
    private readonly toastService: ToastService,

  ) {}


  ngOnChanges() {
    if (this.quadrant?.id) {
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
      this.quadrantService.updateQuadrant(this.quadrant).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Cuadrante actualizado');
          this.saveInProgress = false;
          this.quadrantSaved.emit(this.quadrant);
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    } else {
      this.quadrantService.createQuadrant(this.quadrant).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Cuadrante creado');
          this.saveInProgress = false;
          this.quadrantSaved.emit(this.quadrant);
        },

        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    }
  }
}
