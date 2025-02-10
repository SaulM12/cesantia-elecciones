import { Component } from '@angular/core';
import { Delegate } from '../../helpers/models/delegate/delegate';
import { AuthService } from '../../helpers/services/system/auth.service';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { switchMap } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-elections-menu',
  imports: [ProgressSpinnerModule, NgClass, RouterModule],
  templateUrl: './elections-menu.component.html',
  styleUrl: './elections-menu.component.scss',
})
export class ElectionsMenuComponent {
  delegate: Delegate = {} as Delegate;
  saveInProgress = false;
  uploadedFiles: File[] = [];
  uploadInProgress: boolean = false;
  loadingData: boolean = true;

  constructor(
    private readonly authService: AuthService,
    private readonly delegateService: DelegateService,
    private readonly toastService: ToastService
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
        this.loadingData = false;
      });
  }

  updateDelegate(delegate: Delegate) {
    this.saveInProgress = true;
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
}
