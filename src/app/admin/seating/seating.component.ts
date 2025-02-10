import { InvitationService } from './../../helpers/services/elections/invitation.service';
import {
  InvitationDto,
  Quadrant,
} from './../../helpers/models/organization/quadrant';
import { DelegateService } from './../../helpers/services/delegate/delegate.service';
import { Delegate } from './../../helpers/models/delegate/delegate';
import { NgClass } from '@angular/common';
import {
  QuadrantDto,
  TableDto,
} from '../../helpers/models/organization/quadrant';
import { QuadrantService } from '../../helpers/services/organization/quadrant.service';
import { TableEntityService } from './../../helpers/services/organization/table-entity.service';
import { Component } from '@angular/core';
import { InvitationStatus } from '../../helpers/enums/initation_status';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { InvitationsFormComponent } from '../invitations/invitations-form/invitations-form.component';
import { Invitation } from '../../helpers/models/elections/invitation';
import { ToastService } from '../../helpers/services/system/toast.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-seating',
  imports: [
    NgClass,
    ProgressSpinnerModule,
    DialogModule,
    InvitationsFormComponent,
    ButtonModule
  ],
  templateUrl: './seating.component.html',
  styleUrl: './seating.component.scss',
})
export class SeatingComponent {
  quadrants: QuadrantDto[] = [];
  isLoading = true;
  showFormDialog: boolean = false;
  selectedInvitation: Invitation = {} as Invitation;
  delegates: Delegate[] = [];
  invitationsCount: number = 0;
  invitationsScannedCount: number = 0;
  constructor(
    private readonly toastService: ToastService,
    private readonly quadrantService: QuadrantService,
    private readonly delegateService: DelegateService,
    private readonly invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    this.initApp()
  }

  initApp() {
    this.getQuadrants();
    this.getCountInvitations();
    this.getCountScannedInvitations();
  }

  getCountInvitations() {
    this.invitationService.getTotalInvitations().subscribe({
      next: (invitations) => {
        this.invitationsCount = invitations;
      },
    });
  }

  getCountScannedInvitations() {
    this.invitationService.getScannedInvitations().subscribe({
      next: (invitations) => {
        this.invitationsScannedCount = invitations;
      },
    });
  }

  openModal(
    invitation: InvitationDto,
    table: TableDto,
    quadrantDto: QuadrantDto
  ): void {
    let quadrant: Quadrant = {
      id: quadrantDto.id,
      acronym: quadrantDto.acronym,
      description: quadrantDto.description,
      quadrantOrder: quadrantDto.quadrantOrder,
      electionTypes:[]
    };

    this.selectedInvitation = {
      id: invitation.id,
      chairNumber: invitation.chairNumber,
      status: invitation.status,
      tableEntity: {
        id: table.id,
        tableNumber: table.tableNumber,
        quadrant: quadrant,
      },
      delegate: invitation.delegate ? invitation.delegate : undefined,
      scanned: false,
    };
    this.delegateService
      .getDelegatesWithoutInvitationByQuadrant(quadrant.id)
      .subscribe({
        next: (delegates) => {
          this.delegates = delegates;
          if (!delegates.length) {
            this.toastService.showInfo(
              'Importante',
              'No hay delegados disponibles para asignar en este cuadrante'
            );
          }

          this.showFormDialog = true;
        },
      });
  }

  getQuadrants() {
    this.isLoading = true
    this.showFormDialog = false;
    this.quadrantService.getQuadrantsWithTables().subscribe((quadrants) => {
      this.quadrants = quadrants;
      this.isLoading = false;
    });
  }

  getChairClass(index: number, invitation: InvitationDto): string {
    let chairClass = invitation.delegate ? 'occupied' : 'free';
    if (invitation.status === InvitationStatus.SCANNED) {
      chairClass = 'scanned';
    }
    switch (index) {
      case 0:
        return `${chairClass} top-chair left-top-chair`;
      case 1:
        return `${chairClass} top-chair right-top-chair`;
      case 2:
        return `${chairClass} bottom-chair left-bottom-chair`;
      case 3:
        return `${chairClass} bottom-chair right-bottom-chair`;
      case 4:
        return `${chairClass} left-chair top-left-chair`;
      case 5:
        return `${chairClass} left-chair bottom-left-chair`;
      case 6:
        return `${chairClass} right-chair top-right-chair`;
      case 7:
        return `${chairClass} right-chair bottom-right-chair`;
      default:
        return '';
    }
  }
}
