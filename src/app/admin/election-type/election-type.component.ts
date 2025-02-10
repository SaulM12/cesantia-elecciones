import { Component } from '@angular/core';
import { ElectionType } from '../../helpers/models/elections/election-type';
import { ElectionTypeService } from '../../helpers/services/elections/election-type.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Dialog } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { ElectionTypeFormComponent } from './election-type-form/election-type-form.component';

@Component({
  selector: 'app-election-type',
  imports: [TableModule, Button, Toolbar, Dialog, ElectionTypeFormComponent, NgClass],
  templateUrl: './election-type.component.html',
  styleUrl: './election-type.component.scss',
})
export class ElectionTypeComponent {
  electionTypes: ElectionType[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  selectedType: ElectionType = {} as ElectionType;

  constructor(
    private readonly electionTypeService: ElectionTypeService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.getList();
  }

  showDialog() {
    this.selectedType = {} as ElectionType;
    this.showFormDialog = true;
  }

  showDialogToEdit(electionType: ElectionType) {
    this.selectedType = { ...electionType };
    this.showFormDialog = true;
  }

  getList() {
    this.showFormDialog = false;
    this.electionTypeService.getAllElectionTypes().subscribe({
      next: (electionTypes) => {
        this.electionTypes = electionTypes;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching electionTypes:', error);
        this.isLoading = false;
      },
    });
  }

  delete(electionTypeId: number) {
    this.toastService
      .confirm('¿Está seguro que desea eliminar esta elección?', 'Confirmar')
      .then((result) => {
        if (result) {
          this.electionTypeService
            .deleteElectionType(electionTypeId)
            .subscribe({
              next: () => {
                this.toastService.showSuccess('Éxito', 'Tipo eliminado');
                this.getList();
              },
              error: (error) => {
                this.toastService.showError('Error', error.error?.message);
              },
            });
        }
      });
  }
}
