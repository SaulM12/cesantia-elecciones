import { Component } from '@angular/core';
import { Invitation } from '../../helpers/models/elections/invitation';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Quadrant } from '../../helpers/models/organization/quadrant';
import { FileService } from '../../helpers/services/system/file.service';
import { InvitationService } from '../../helpers/services/elections/invitation.service';
import { InvitationStatus } from '../../helpers/enums/initation_status';

@Component({
  selector: 'app-invitations',
  imports: [ToolbarModule, ButtonModule, TableModule, DialogModule],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.scss',
})
export class InvitationsComponent {
  invitations: Invitation[] = [];
  showFormDialog: boolean = false;
  isLoading: boolean = true;

  constructor(
    private readonly fileService: FileService,
    private readonly invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    this.getInvitations();
  }

  getInvitations() {
    this.invitationService.getAllWithDelegates().subscribe({
      next: (invitations) => {  
        this.invitations = invitations;
        this.isLoading = false;
      }
    });
  }

  getEnumEquivalency(status:string){
    return InvitationStatus[status as keyof typeof InvitationStatus];
  }

  exportToExcel(quadrants: Invitation[]) {
    const headers = {
      id: 'ID',
      description: 'Descripción',
      acronym: 'Acrónimo',
    };

    const formattedQuadrants = quadrants.map((quadrant) => ({
      [headers.id]: quadrant.id,
    }));

    this.fileService.saveAsExcelFile(formattedQuadrants, 'Cuadrantes');
  }
}
