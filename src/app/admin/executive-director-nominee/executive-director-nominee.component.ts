import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { ExecutiveDirectorNomineeFormComponent } from './executive-director-nominee-form/executive-director-nominee-form.component';
import { ExecutiveDirectorNominee } from '../../helpers/models/executive-director/executive-director-nominee';
import { ExecutiveDirectorNomineeService } from '../../helpers/services/executive-director/executive-director-nominee.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { FileService } from '../../helpers/services/system/file.service';
import {
  FileSelectEvent,
  FileUploadEvent,
  FileUploadModule,
} from 'primeng/fileupload';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-executive-director-nominee',
  imports: [
    TableModule,
    Button,
    Toolbar,
    Dialog,
    ExecutiveDirectorNomineeFormComponent,
    FileUploadModule,
  ],
  templateUrl: './executive-director-nominee.component.html',
  styleUrl: './executive-director-nominee.component.scss',
})
export class ExecutiveDirectorNomineeComponent {
  nomineeList: ExecutiveDirectorNominee[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  showImageDialog: boolean = false;
  selectedNominee: ExecutiveDirectorNominee = {} as ExecutiveDirectorNominee;
  uploadedFiles: File[] = [];
  uploadInProgress: boolean = false;

  constructor(
    private readonly nomineeService: ExecutiveDirectorNomineeService,
    private readonly toastService: ToastService,
    private readonly fileService: FileService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getList();
  }

  showDialog() {
    this.selectedNominee = {} as ExecutiveDirectorNominee;
    this.showFormDialog = true;
  }

  showDialogToEdit(nominee: ExecutiveDirectorNominee) {
    this.selectedNominee = { ...nominee };
    this.showFormDialog = true;
  }

  openImageDialog(nominee: ExecutiveDirectorNominee) {
    this.selectedNominee = { ...nominee };
    this.showImageDialog = true;
    this.uploadedFiles = [];
  }

  decodeImage(base64String: string) {
    const imageUrl = `data:image/*;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getList() {
    this.showFormDialog = false;
    this.nomineeService.getAllNominees().subscribe({
      next: (nomineeList) => {
        this.nomineeList = nomineeList;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching nomineeList:', error);
        this.isLoading = false;
      },
    });
  }

  exportToExcel(nomineeList: ExecutiveDirectorNominee[]) {
    const headers = {
      id: 'ID',
      ci: 'CI',
      names: 'Nombres',
      lastName: 'Apellido Paterno',
      secondLastName: 'Apellido Materno',
      electionName: 'Nombre de la Elección',
      period: 'Período',
    };

    const formattedNominees = nomineeList.map((nominee) => ({
      [headers.id]: nominee.id,
      [headers.ci]: nominee.ci,
      [headers.names]: nominee.names,
      [headers.electionName]: nominee.electionName,
      [headers.period]: nominee.period?.description || 'N/A',
    }));

    this.fileService.saveAsExcelFile(formattedNominees, 'Nominados');
  }

  uploadImage(selectedNominee: ExecutiveDirectorNominee) {
    if (this.uploadedFiles.length === 0) {
      this.toastService.showError('Error', 'Debe seleccionar una imagen');
      return;
    }
    this.uploadInProgress = true;

    this.nomineeService
      .uploadNomineeImage(selectedNominee.id, this.uploadedFiles[0])
      .subscribe({
        next: () => {
          this.uploadInProgress = false;
          this.toastService.showSuccess(
            'Guardada',
            'Imagen subida exitosamente'
          );
          this.showImageDialog = false;
          this.uploadedFiles = [];
          this.getList();
        },
        error: (error) => {
          this.uploadInProgress = false;
          this.toastService.showError('Error', 'Error al subir la imagen');
        },
      });
  }

  onSelectImage(event: FileSelectEvent) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
