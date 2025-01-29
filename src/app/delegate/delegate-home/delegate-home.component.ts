import { Component } from '@angular/core';
import { AuthService } from '../../helpers/services/system/auth.service';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { switchMap } from 'rxjs';
import { Delegate } from '../../helpers/models/delegate/delegate';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../helpers/services/system/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-delegate-home',
  imports: [
    RouterModule,
    FormsModule,
    InputText,
    SelectModule,
    CheckboxModule,
    CardModule,
    ButtonModule,
    FileUploadModule,
  ],
  templateUrl: './delegate-home.component.html',
  styleUrl: './delegate-home.component.scss',
})
export class DelegateHomeComponent {
  delegate: Delegate = {} as Delegate;
  saveInProgress = false;
  uploadedFiles: File[] = [];
  uploadInProgress:boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly delegateService: DelegateService,
    private readonly toastService: ToastService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService
      .getUserDetails()
      .pipe(
        switchMap((userDetails) => {
          return this.delegateService.getByCi(userDetails.ci);
        })
      )
      .subscribe((delegateInfo) => {
        this.delegate = delegateInfo;
      });
  }

  updateDelegate(delegate: Delegate) {
    this.saveInProgress = true;
    delegate.completeInfo = true;
    this.delegateService.update(delegate).subscribe({
      next: () => {
        this.toastService.showSuccess(
          'Actualizado',
          'Se han actualizado los datos correctamente'
        );
        this.getUserDetails();
        this.saveInProgress = false;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error?.message);
        this.saveInProgress = false;
      },
    });
  }

  decodeImage(base64String: string) {
    const imageUrl = `data:image/*;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onSelectImage(event: FileSelectEvent) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  uploadImage(delegate: Delegate) {
    this.uploadInProgress = true;
    this.delegateService
      .uploadDelegateImage(delegate.ci, this.uploadedFiles[0])
      .subscribe({
        next: () => {
          this.toastService.showSuccess(
            'Guardada',
            'Imagen subida exitosamente'
          );
          this.uploadedFiles = [];
          this.uploadInProgress = false;
          this.getUserDetails();
        },
        error: (error) => {
          this.uploadInProgress = false;
          this.toastService.showError('Error', 'Error al subir la imagen');
        },
      });
  }
}
