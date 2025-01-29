import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { Grade } from '../../helpers/models/organization/grade';
import { GradeService } from '../../helpers/services/organization/grade.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { FileService } from '../../helpers/services/system/file.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-grade',
  imports: [TableModule, Button, Toolbar, Dialog, GradeFormComponent, NgClass],
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.scss',
})
export class GradeComponent {
  gradeList: Grade[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  selectedGrade: Grade = {} as Grade;

  constructor(
    private readonly gradeService: GradeService,
    private readonly toastService: ToastService,
    private readonly fileService: FileService
  ) {}

  ngOnInit() {
    this.getList();
  }

  showDialog() {
    this.selectedGrade = {} as Grade;
    this.showFormDialog = true;
  }

  showDialogToEdit(grade: Grade) {
    this.selectedGrade = { ...grade };
    this.showFormDialog = true;
  }

  getList() {
    this.showFormDialog = false;
    this.gradeService.getAll().subscribe({
      next: (gradeList) => {
        this.gradeList = gradeList;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching gradeList:', error);
        this.isLoading = false;
      },
    });
  }

  delete(quadrantId: number) {
    this.toastService
      .confirm('¿Está seguro que desea eliminar este cuadrante?', 'Confirmar')
      .then((result) => {
        if (result) {
          this.gradeService.delete(quadrantId).subscribe({
            next: () => {
              this.toastService.showSuccess('Éxito', 'Cuadrante eliminado');
              this.getList();
            },
            error: (error) => {
              this.toastService.showError('Error', error.error?.message);
            },
          });
        }
      });
  }

  exportToExcel(gradeList: Grade[]) {
    const headers = {
      id: 'ID',
      description: 'Descripción',
      abbreviation: 'Abreviatura',
      active: 'Activo',
      quadrant: 'Cuadrante',
    };

    const formattedQuadrants = gradeList.map((grade) => ({
      [headers.id]: grade.id,
      [headers.description]: grade.description,
      [headers.abbreviation]: grade.abbreviation,
      [headers.active]: grade.active,
      [headers.quadrant]: grade.quadrant.description,
    }));

    this.fileService.saveAsExcelFile(formattedQuadrants, 'Grados');
  }
}
