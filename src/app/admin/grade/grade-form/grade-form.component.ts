import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Grade } from '../../../helpers/models/organization/grade';
import { FormsModule, NgForm } from '@angular/forms';
import { GradeService } from '../../../helpers/services/organization/grade.service';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { QuadrantService } from '../../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../../helpers/models/organization/quadrant';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Select } from 'primeng/select';

@Component({
  selector: 'grade-form',
  imports: [FormsModule,Button,InputText, NgClass,ToggleSwitchModule, Select],
  templateUrl: './grade-form.component.html',
  styleUrl: './grade-form.component.scss',
})
export class GradeFormComponent {
  edit: boolean = false;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  quadrants: Quadrant[] = [];
  @Input('grade') grade: Grade = {} as Grade;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') quadrantSaved = new EventEmitter<Grade>();

  constructor(
    private readonly gradeService: GradeService,
    private readonly toastService: ToastService,
    private readonly quadrantService: QuadrantService
  ) {}

  ngOnInit(): void {
    this.getQuadrants();
  }

  ngOnChanges() {
    if (this.grade?.id) {
      this.edit = true;
    } else {
      this.edit = false;
      this.grade.active = true;
    }
  }

  getQuadrants() {
    this.quadrantService.getQuadrants().subscribe({
      next: (quadrants) => {
        this.quadrants = quadrants;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }

  save() {
    if (!this.form.valid) {
      this.toastService.showError('Error', 'Revise los campos del formulario');
      this.submitted = true;
      return;
    }
    this.saveInProgress = true;
    if (this.edit) {
      this.gradeService.update(this.grade).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Grado actualizado');
          this.saveInProgress = false;
          this.quadrantSaved.emit(this.grade);
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    } else {
      this.gradeService.create(this.grade).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Grado creado');
          this.saveInProgress = false;
          this.quadrantSaved.emit(this.grade);
        },

        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    }
  }
}
