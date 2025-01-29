import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../helpers/services/system/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Invitation } from '../helpers/models/elections/invitation';
import { InvitationService } from '../helpers/services/elections/invitation.service';
import { ToastService } from '../helpers/services/system/toast.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-scanner',
  imports: [
    MenubarModule,
    RouterModule,
    ZXingScannerModule,
    InputText,
    FormsModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.scss',
})
export class ScannerComponent {
  items: MenuItem[] = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.clearCache();
        this.authService.logout().subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });
        // No need to handle the response
      },
    },
  ];
  result: string | null = null;
  torchEnabled: boolean = false;
  ci: string = '';
  invitation: Invitation | undefined;
  showInvitation = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly invitationService: InvitationService,
    private readonly toastService: ToastService
  ) {}

  searchInvitation(ci: string) {
    this.toastService.showInfo('Buscando', 'Buscando invitación...');
    this.invitationService.getByDelegateCi(ci).subscribe({
      next: (invitation) => {
        this.invitation = invitation;
        this.showInvitation = true;
      },
      error: (err) => {
        this.toastService.showError('Error', 'No se encontró la invitación');
      },
    });
  }

  resetScanner() {
    this.invitation = undefined;
    this.result = null;
  }

  confirmAttendance(invitationId:number) {
    this.invitationService.confirmScan(invitationId).subscribe({
      next: (invitation) => {
        this.toastService.showSuccess(
          'Éxito',
          'Invitación correctamente registrada'
        );
        this.showInvitation = false;
      },
      error: (err) => {
        this.toastService.showError(
          'Error',
          'No se pudo confirmar la asistencia'
        );
      },
    });
  }
}
