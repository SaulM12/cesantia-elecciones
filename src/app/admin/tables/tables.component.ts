import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { ToastService } from '../../helpers/services/system/toast.service';
import { FileService } from '../../helpers/services/system/file.service';
import { TableEntity } from '../../helpers/models/organization/table-entity';
import { TableEntityService } from '../../helpers/services/organization/table-entity.service';
import { TableFormComponent } from './table-form/table-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tables',
  imports: [
    TableModule,
    Button,
    Toolbar,
    Dialog,
    TableFormComponent,
    RouterModule,
  ],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
})
export class TablesComponent {
  tables: TableEntity[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  selectedTable: TableEntity = {} as TableEntity;

  constructor(
    private readonly tableService: TableEntityService,
    private readonly toastService: ToastService,
    private readonly fileService: FileService
  ) {}

  ngOnInit() {
    this.getList();
  }

  showDialog() {
    this.selectedTable = {} as TableEntity;
    this.showFormDialog = true;
  }

  showDialogToEdit(table: TableEntity) {
    this.selectedTable = { ...table };
    this.showFormDialog = true;
  }

  getList() {
    this.showFormDialog = false;
    this.tableService.getAll().subscribe({
      next: (tables) => {
        this.tables = tables;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching tables:', error);
        this.isLoading = false;
      },
    });
  }

  delete(quadrantId: number) {
    this.toastService
      .confirm('¿Está seguro que desea eliminar esta mesa?', 'Confirmar')
      .then((result) => {
        if (result) {
          this.tableService.delete(quadrantId).subscribe({
            next: () => {
              this.toastService.showSuccess('Éxito', 'Mesa eliminada');
              this.getList();
            },
            error: (error) => {
              this.toastService.showError('Error', error.error?.message);
            },
          });
        }
      });
  }

  exportToExcel(tables: TableEntity[]) {
    const headers = {
      id: 'ID',
      quadrant: 'Cuadrante',
      tableNumber: 'Número de mesa',
    };

    const formattedQuadrants = tables.map((table) => ({
      [headers.id]: table.id,
      [headers.tableNumber]: table.tableNumber,
      [headers.quadrant]: table.quadrant.description,
    }));

    this.fileService.saveAsExcelFile(formattedQuadrants, 'Mesas');
  }
}
