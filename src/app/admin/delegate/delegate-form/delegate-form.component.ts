import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Delegate } from '../../../helpers/models/delegate/delegate';
import { Grade } from '../../../helpers/models/organization/grade';
import { DelegateType } from '../../../helpers/models/delegate/delegate-type';
import { DelegateService } from '../../../helpers/services/delegate/delegate.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Select } from 'primeng/select';
import { GradeService } from '../../../helpers/services/organization/grade.service';
import { DelegateTypeService } from '../../../helpers/services/delegate/delegate-type.service';
import { QuadrantService } from '../../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../../helpers/models/organization/quadrant';
import { UnitService } from '../../../helpers/services/organization/unit.service';
import { Unit } from '../../../helpers/models/organization/unit';
import { ToastService } from '../../../helpers/services/system/toast.service';

@Component({
  selector: 'delegate-form',
  imports: [
    FormsModule,
    Button,
    InputText,
    NgClass,
    ToggleSwitchModule,
    Select,
  ],
  templateUrl: './delegate-form.component.html',
  styleUrl: './delegate-form.component.scss',
})
export class DelegateFormComponent {
  grades: Grade[] = [];
  allGrades: Grade[] = [];
  delegateTypes: DelegateType[] = [];
  quadrants: Quadrant[] = [];
  saveInProgress: boolean = false;
  submitted: boolean = false;
  loadingGrades: boolean = false;
  selectedQuadrant: Quadrant = {} as Quadrant;
  units: Unit[] = [];
  edit: boolean = false;
  @Input() delegate: Delegate = {} as Delegate;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') delegateSaved = new EventEmitter<Delegate>();
  constructor(
    private readonly delegateService: DelegateService,
    private readonly gradeService: GradeService,
    private readonly quadrantService: QuadrantService,
    private readonly unitService: UnitService,
    private readonly delegateTypeService: DelegateTypeService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getQuadrants();
    this.getUnits();
    this.getDelegateTypes();
  }
  ngOnChanges() {
    if (this.delegate?.id) {
      this.selectedQuadrant = this.delegate.grade.quadrant;
      this.getGrades(this.delegate.grade.quadrant);
      this.edit = true;
    } else {
      this.edit = false;
      this.delegate.active = true;
    }
  }

  getDelegateTypes() {
    this.delegateTypeService.getAll().subscribe({
      next: (delegateTypes) => {
        this.delegateTypes = delegateTypes;
      },
    });
  }

  getUnits() {
    this.unitService.getAll().subscribe({
      next: (units) => {
        this.units = units;
      },
    });
  }

  getGrades(quadrant: Quadrant) {
    this.loadingGrades = true;
    if (this.allGrades.length > 0) {
      this.loadingGrades = false;
      this.grades = this.allGrades.filter(
        (grade) => grade.quadrant.id === quadrant.id
      );
    } else {
      this.gradeService.getAll().subscribe({
        next: (grades) => {
          this.allGrades = grades;
          this.grades = grades.filter(
            (grade) => grade.quadrant.id === quadrant.id
          );
          this.loadingGrades = false;
        },
      });
    }
  }

  getQuadrants() {
    this.quadrantService.getQuadrants().subscribe({
      next: (quadrants) => {
        this.quadrants = quadrants;
      },
    });
  }

  save() {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    this.saveInProgress = true;

    this.delegateService.create(this.delegate).subscribe({
      next: (delegate) => {
        this.toastService.showSuccess('Guardado', 'Delegado creado');
        this.saveInProgress = false;
        this.delegateSaved.emit(delegate);
      },
      error: (err) => {
        this.saveInProgress = false;
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }

  update() {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    this.saveInProgress = true;

    this.delegateService.update(this.delegate).subscribe({
      next: (delegate) => {
        this.toastService.showSuccess('Guardado', 'Delegado actualizado');
        this.saveInProgress = false;
        this.delegateSaved.emit(delegate);
      },
      error: (err) => {
        this.saveInProgress = false;
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }
}
