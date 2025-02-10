import { Component } from '@angular/core';
import { Delegate } from '../../helpers/models/delegate/delegate';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { FileService } from '../../helpers/services/system/file.service';
import { DelegateFormComponent } from './delegate-form/delegate-form.component';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Dialog } from 'primeng/dialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-delegate',
  imports: [TableModule, Button, Toolbar, Dialog, DelegateFormComponent, NgClass],
  templateUrl: './delegate.component.html',
  styleUrl: './delegate.component.scss'
})
export class DelegateComponent {
  delegateList: Delegate[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  selectedDelegate: Delegate = {} as Delegate;

  constructor(
    private readonly delegateService: DelegateService,
    private readonly toastService: ToastService,
    private readonly fileService: FileService
  ) {}

  ngOnInit() {
    this.getList();
  }

  showDialog() {
    this.selectedDelegate = {} as Delegate;
    this.showFormDialog = true;
  }

  showDialogToEdit(delegate: Delegate) {
    this.selectedDelegate = { ...delegate };
    this.showFormDialog = true;
  }

  getList() {
    this.showFormDialog = false;
    this.delegateService.getAll().subscribe({
      next: (delegateList) => {
        this.delegateList = delegateList;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching delegateList:', error);
        this.isLoading = false;
      },
    });
  }

  delete(delegateId: number) {
    this.toastService
      .confirm('¿Está seguro que desea eliminar este delegado?', 'Confirmar')
      .then((result) => {
        if (result) {
          this.delegateService.delete(delegateId).subscribe({
            next: () => {
              this.toastService.showSuccess('Éxito', 'Delegado eliminado');
              this.getList();
            },
            error: (error) => {
              this.toastService.showError('Error', error.error?.message);
            },
          });
        }
      });
  }

  exportToExcel(delegateList: Delegate[]) {
    const headers = {
      id: 'ID',
      ci: 'CI',
      names: 'Nombres',
      lastName: 'Apellido Paterno',
      secondLastName: 'Apellido Materno',
      phone: 'Teléfono',
      active: 'Activo',
      grade: 'Grado',
    };

    const formattedDelegates = delegateList.map((delegate) => ({
      [headers.id]: delegate.id,
      [headers.ci]: delegate.ci,
      [headers.names]: delegate.names,
      [headers.phone]: delegate.phone,
      [headers.active]: delegate.active ? 'Sí' : 'No',
      [headers.grade]: delegate.grade?.description || 'N/A',
    }));

    this.fileService.saveAsExcelFile(formattedDelegates, 'Delegados');
  }
}
