import { Component } from '@angular/core';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { Dialog } from 'primeng/dialog';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Unit } from '../../helpers/models/organization/unit';
import { UnitService } from '../../helpers/services/organization/unit.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { FileService } from '../../helpers/services/system/file.service';

@Component({
  selector: 'app-unit',
  imports: [TableModule, ButtonModule, Toolbar, Dialog, UnitFormComponent],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
})
export class UnitComponent {
  units: Unit[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  selectedUnit: Unit = {} as Unit;

  constructor(
    private readonly unitService: UnitService,
    private readonly toastService: ToastService,
    private readonly fileService: FileService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  showDialog() {
    this.selectedUnit = {} as Unit;
    this.showFormDialog = true;
  }

  showDialogToEdit(unit: Unit) {
    this.selectedUnit = {...unit};
    this.showFormDialog = true;
  }

  getAll() {
    this.showFormDialog = false;
    this.unitService.getAll().subscribe({
      next: (units) => {
        this.units = units;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching units:', error);
        this.isLoading = false;
      },
    });
  }

  delete(quadrantId: number) {
    this.toastService
      .confirm('¿Está seguro que desea eliminar esta unidad?', 'Confirmar')
      .then((result) => {
        if (result) {
          this.unitService.delete(quadrantId).subscribe({
            next: () => {
              this.toastService.showSuccess('Éxito', 'Unidad eliminada');
              this.getAll();
            },
            error: (error) => {
              this.toastService.showError('Error', error.error?.message);
            },
          });
        }
      });
  }

  exportToExcel(units: Unit[]) {
    const headers = {
      id: 'ID',
      description: 'Descripción',
      abbreviation: 'Abreviatura',
    };

    const formattedQuadrants = units.map((unit) => ({
      [headers.id]: unit.id,
      [headers.description]: unit.description,
      [headers.abbreviation]: unit.abbreviation,
    }));

    this.fileService.saveAsExcelFile(formattedQuadrants, 'Unidades');
  }
}
