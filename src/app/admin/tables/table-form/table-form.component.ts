import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgClass } from '@angular/common';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { TableEntityService } from '../../../helpers/services/organization/table-entity.service';
import { QuadrantService } from '../../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../../helpers/models/organization/quadrant';
import { FormsModule, NgForm } from '@angular/forms';
import { TableEntity } from '../../../helpers/models/organization/table-entity';
import { Select } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'table-form',
  imports: [
    TableModule,
    Button,
    FormsModule,
    NgClass,
    Select,
    InputNumberModule,
    InputTextModule
  ],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss',
})
export class TableFormComponent {
  edit: boolean = false;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  quadrants: Quadrant[] = [];
  @Input('table') table: TableEntity = {} as TableEntity;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') quadrantSaved = new EventEmitter<TableEntity>();

  constructor(
    private readonly tableEntityService: TableEntityService,
    private readonly toastService: ToastService,
    private readonly quadrantService: QuadrantService
  ) {}

  ngOnInit(): void {
    this.getQuadrants();
  }

  ngOnChanges() {
    if (this.table?.id) {
      this.edit = true;
    } else {
      this.edit = false;
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
      this.tableEntityService.update(this.table).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Mesa actualizada');
          this.saveInProgress = false;
          this.quadrantSaved.emit(this.table);
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    } else {
      this.tableEntityService.create(this.table).subscribe({
        next: () => {
          this.toastService.showSuccess('Éxito', 'Mesa creada');
          this.saveInProgress = false;
          this.quadrantSaved.emit(this.table);
        },

        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
          this.saveInProgress = false;
        },
      });
    }
  }
}
