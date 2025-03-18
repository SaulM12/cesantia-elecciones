import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Invitation } from '../../../helpers/models/elections/invitation';
import { Delegate } from '../../../helpers/models/delegate/delegate';
import { InvitationService } from '../../../helpers/services/elections/invitation.service';
import { FormsModule, NgForm } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { NgClass } from '@angular/common';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { DelegateService } from '../../../helpers/services/delegate/delegate.service';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'invitations-form',
  imports: [FormsModule, InputText, SelectModule, NgClass,MessageModule],
  templateUrl: './invitations-form.component.html',
  styleUrl: './invitations-form.component.scss',
})
export class InvitationsFormComponent {
  @Input() invitation: Invitation = {} as Invitation;
  invitationToForm: Invitation = {} as Invitation;
  @Input() delegates: Delegate[] = [];
  @ViewChild('form') form!: NgForm;
  @Output('onSave') saveEvent = new EventEmitter<Invitation>();
  saveInProgress: boolean = false;
  submitted: boolean = false;

  constructor(
    private readonly invitationService: InvitationService,
    private readonly toastService: ToastService,
    private readonly delegateService: DelegateService
  ) {}

  ngOnInit(): void {
    // Validación si se necesita lógica adicional al recibir los datos
  }

  ngOnChanges() {
    if (this.invitation?.id) {
      this.invitationToForm = { ...this.invitation };
    }
  }

  saveInvitation() {
    if (!this.form.valid) {
      this.submitted = true;
      return;
    }
    this.saveInProgress = true;

    this.invitationService
      .assignDelegateToInvitation(
        this.invitation.id,
        this.invitationToForm.delegate!.id
      )
      .subscribe({
        next: (invitation) => {
          this.toastService.showSuccess(
            'Guardado',
            'Invitación enviada correctamente'
          );
          this.saveEvent.emit(invitation);
          this.saveInProgress = false;
          // Lógica de éxito
        },
        error: (err) => {
          this.saveInProgress = false;
          this.toastService.showError('Error', 'Error al enviar la invitación');
        },
      });
  }

  setAsCandidate(ci: string, invitation: Invitation) {
    this.saveInProgress = true;
    this.delegateService.setCandidateToTrue(ci).subscribe({
      next: () => {
        this.toastService.showSuccess(
          'Candidato',
          'El delegado ha sido registrado como candidato'
        );
        this.saveEvent.emit(invitation);
        this.saveInProgress = false;
      },
      error: (err) => {
        this.saveInProgress = false;
        this.toastService.showError(
          'Error',
          'Error al registrar el delegado como candidato'
        );
      },
    });
  }
}
