import { Component } from '@angular/core';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { QuadrantService } from '../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../helpers/models/organization/quadrant';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { CandidateElectionsService } from '../../helpers/services/elections/candidate-elections.service';
@Component({
  selector: 'app-elections',
  imports: [ToolbarModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './elections.component.html',
  styleUrl: './elections.component.scss',
})
export class ElectionsComponent {
  quadrants: Quadrant[] = [];
  isLoading:boolean = false

  constructor(
    private readonly delegateService: DelegateService,
    private readonly toastService: ToastService,
    private readonly quadrantService: QuadrantService,
    private readonly candidateElectionsService:CandidateElectionsService
  ) {}

  ngOnInit(): void {
    this.getAllQuadrants();
  }

  getAllQuadrants() {
    this.quadrantService.getQuadrants().subscribe({
      next: (response) => {
        this.quadrants = response;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }

  changeDelegateVoteStatus(newState: boolean) {
    let message = newState ? 'habilitó' : 'deshabilitó';
    this.delegateService.updateEnableToVote(newState).subscribe({
      next: () => {
        this.toastService.showSuccess(
          'Estado actualizado',
          `Se ${message} el permiso de votación de los participantes`
        );
      },
      error: (err) => {
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }

  generatePDF() {
    this.isLoading = true
    this.toastService.showInfo('ACTAS', 'Generando documento en pdf...');
    this.candidateElectionsService.generatePdf().subscribe({
      next: (data) => {
        let newFile = new File([data], 'acta.pdf', {
          type: 'application/pdf',
        });
        this.isLoading = false
        let fileURL = URL.createObjectURL(newFile);
        window.open(fileURL, '_blank');
      },
      error: (err) => {
        this.isLoading = false
        this.toastService.showError('Error', err.error.message);
      },
    });
  }
}
