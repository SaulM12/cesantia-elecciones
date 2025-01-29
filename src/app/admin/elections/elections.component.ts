import { Component } from '@angular/core';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { QuadrantService } from '../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../helpers/models/organization/quadrant';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-elections',
  imports: [ToolbarModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './elections.component.html',
  styleUrl: './elections.component.scss',
})
export class ElectionsComponent {
  quadrants: Quadrant[] = [];
  constructor(
    private readonly delegateService: DelegateService,
    private readonly toastService: ToastService,
    private readonly quadrantService: QuadrantService
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
}
