import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Quadrant } from '../../helpers/models/organization/quadrant';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { QuadrantService } from '../../helpers/services/organization/quadrant.service';
import { Dialog } from 'primeng/dialog';
import { QuadrantFormComponent } from './quadrant-form/quadrant-form.component';
import { ToastService } from '../../helpers/services/system/toast.service';
import { FileService } from '../../helpers/services/system/file.service';
import { ElectionTypeService } from '../../helpers/services/elections/election-type.service';
import { ElectionType } from '../../helpers/models/elections/election-type';

@Component({
  selector: 'app-quadrant',
  imports: [TableModule, ButtonModule, Toolbar, Dialog, QuadrantFormComponent],
  templateUrl: './quadrant.component.html',
  styleUrl: './quadrant.component.scss',
})
export class QuadrantComponent {
  quadrants: Quadrant[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  selectedQuadrant: Quadrant = {} as Quadrant;
electionTypes: ElectionType[] = [];
  constructor(
    private readonly quadrantService: QuadrantService,
    private readonly toastService: ToastService,
    private readonly fileService: FileService,
    private readonly electionTypeService: ElectionTypeService
  ) {}

  ngOnInit() {
    this.getAll();
    this.getElectionTypes();
  }

  getElectionTypes() {
    this.electionTypeService.getAllElectionTypes().subscribe((data) => {
      this.electionTypes = data
    });
  }

  showDialog() {
    this.selectedQuadrant = {} as Quadrant;
    this.showFormDialog = true;
  }

  showDialogToEdit(quadrant: Quadrant) {
    this.selectedQuadrant = {...quadrant};
    this.showFormDialog = true;
  }

  getAll() {
    this.showFormDialog = false;
    this.quadrantService.getQuadrants().subscribe({
      next: (quadrants) => {
        this.quadrants = quadrants;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching quadrants:', error);
        this.isLoading = false;
      },
    });
  }

  delete(quadrantId: number) {
    this.toastService
      .confirm('¿Está seguro que desea eliminar este cuadrante?', 'Confirmar')
      .then((result) => {
        if (result) {
          this.quadrantService.deleteQuadrant(quadrantId).subscribe({
            next: () => {
              this.toastService.showSuccess('Éxito', 'Cuadrante eliminado');
              this.getAll();
            },
            error: (error) => {
              this.toastService.showError('Error', error.error?.message);
            },
          });
        }
      });
  }

  exportToExcel(quadrants: Quadrant[]) {
    const headers = {
      id: 'ID',
      description: 'Descripción',
      acronym: 'Acrónimo',
    };

    const formattedQuadrants = quadrants.map((quadrant) => ({
      [headers.id]: quadrant.id,
      [headers.description]: quadrant.description,
      [headers.acronym]: quadrant.acronym,
    }));

    this.fileService.saveAsExcelFile(formattedQuadrants, 'Cuadrantes');
  }
}
