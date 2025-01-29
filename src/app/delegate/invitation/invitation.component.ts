import { Component } from '@angular/core';
import { AuthService } from '../../helpers/services/system/auth.service';
import { InvitationService } from '../../helpers/services/elections/invitation.service';
import { switchMap } from 'rxjs';
import { Invitation } from '../../helpers/models/elections/invitation';
import { ButtonModule } from 'primeng/button';
import { QrCodeComponent } from 'ng-qrcode';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../helpers/services/system/toast.service';
import { NgZone } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
@Component({
  selector: 'app-invitation',
  imports: [QrCodeComponent, RouterModule, ButtonModule,NgxPrintModule],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss',
})
export class InvitationComponent {
  invitation: Invitation = {} as Invitation;
  saveInProgress = false;
  constructor(
    private readonly authService: AuthService,
    private readonly invitationService: InvitationService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService
      .getUserDetails()
      .pipe(
        switchMap((userDetails) => {
          return this.invitationService.getByDelegateCi(userDetails.ci);
        })
      )
      .subscribe({
        next: (invitation) => {
          this.invitation = invitation;
        },
        error: (error) => {
          this.toastService.showError(
            'Error',
            'Aún no tienes una invitación asociada'
          );
          this.router.navigate(['/delegate']);
        },
      });
  }



  printInvitation() {
    const printContents = document.getElementById('printableArea')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      this.ngZone.runOutsideAngular(() => {
      document.body.innerHTML = printContents;
      setTimeout(() => {
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
      }, 1000); // Delay to ensure QR code is rendered
      });
    } else {
      this.toastService.showError('Error', 'No se pudo encontrar la invitación para imprimir');
    }
  }
}
