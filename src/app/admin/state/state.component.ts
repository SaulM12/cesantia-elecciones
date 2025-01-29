import {
  Component,
} from '@angular/core';
import { State } from '../../helpers/models/system/state';
import { StateService } from '../../helpers/services/system/state.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { FileService } from '../../helpers/services/system/file.service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Dialog } from 'primeng/dialog';
import { StateFormComponent } from './state-form/state-form.component';


@Component({
  selector: 'app-state',
imports: [TableModule, Button, Toolbar, Dialog, StateFormComponent],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
})
export class StateComponent {
   stateList: State[] = [];
    isLoading: boolean = true;
    showFormDialog: boolean = false;
    selectedState: State = {} as State;
  
    constructor(
      private readonly stateService: StateService,
      private readonly toastService: ToastService,
      private readonly fileService: FileService
    ) {}
  
    ngOnInit() {
      this.getList();
    }
  
    showDialog() {
      this.selectedState = {} as State;
      this.showFormDialog = true;
    }
  
    showDialogToEdit(state: State) {
      this.selectedState = {...state};
      this.showFormDialog = true;
    }
  
    getList() {
      this.showFormDialog = false;
      this.stateService.get().subscribe({
        next: (stateList) => {
          this.stateList = stateList;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching:', error);
          this.isLoading = false;
        },
      });
    }
  
    delete(quadrantId: number) {
      this.toastService
        .confirm('¿Está seguro que desea eliminar este estado?', 'Confirmar')
        .then((result) => {
          if (result) {
            this.stateService.delete(quadrantId).subscribe({
              next: () => {
                this.toastService.showSuccess('Éxito', 'Estado eliminado');
                this.getList();
              },
              error: (error) => {
                this.toastService.showError('Error', error.error?.message);
              },
            });
          }
        });
    }
  
    exportToExcel(stateList: State[]) {
      const headers = {
        id: 'ID',
        description: 'Descripción',
      };
  
      const formattedQuadrants = stateList.map((state) => ({
        [headers.id]: state.id,
        [headers.description]: state.description,
      }));
  
      this.fileService.saveAsExcelFile(formattedQuadrants, 'Estados');
    }
}
