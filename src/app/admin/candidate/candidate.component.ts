import { Component } from '@angular/core';
import { CandidateElectionsService } from '../../helpers/services/elections/candidate-elections.service';
import { CandidateElection } from '../../helpers/models/elections/candidate-election';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Dialog } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { ElectionTypeService } from '../../helpers/services/elections/election-type.service';
import { QuadrantService } from '../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../helpers/models/organization/quadrant';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ElectionType } from '../../helpers/models/elections/election-type';
import { ToastService } from '../../helpers/services/system/toast.service';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { Delegate } from '../../helpers/models/delegate/delegate';
@Component({
  selector: 'app-candidate',
  imports: [
    TableModule,
    Button,
    Toolbar,
    Dialog,
    NgClass,
    SelectModule,
    FormsModule,
  ],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss',
})
export class CandidateComponent {
  candidates: CandidateElection[] = [];
  delegateId: number = 0;
  electionTypeId: number = 0;
  quadrantId: number = 0;
  loading: boolean = false;
  errorMessage: string = '';
  showFormDialog: boolean = false;
  quadrants: Quadrant[] = [];
  selectedQuadrant!: Quadrant;
  selectedElection!: ElectionType;
  electionTypes: ElectionType[] = [];
  delegates: Delegate[] = [];
  selectedDelegate: Delegate | undefined;
  saveInProgress: boolean = false;

  constructor(
    private readonly candidateService: CandidateElectionsService,
    private readonly quadrantService: QuadrantService,
    private readonly toastService: ToastService,
    private readonly delegateService: DelegateService
  ) {}

  ngOnInit(): void {
    //this.getCandidates();
    this.getQuadrants();
  }

  getQuadrants() {
    this.quadrantService.getQuadrants().subscribe((data) => {
      this.quadrants = data;
    });
  }

  showDialog() {
    this.showFormDialog = true;
  }

  getCandidates(): void {
    this.loading = true;
    this.candidateService
      .getCandidatesByElectionTypeAndQuadrant(
        this.selectedElection.id,
        this.selectedQuadrant.id
      )
      .subscribe({
        next: (data) => {
          this.candidates = data;
          if (!data.length) {
            this.toastService.showInfo(
              'Sin candidatos',
              'La elección no tiene candidatos'
            );
          }
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error al obtener los candidatos';
          console.error(err);
          this.loading = false;
        },
      });
    this.getDelegates();
  }

  getDelegates() {
    this.delegateService
      .getDelegatesWithoutInvitationByQuadrant(this.selectedQuadrant.id)
      .subscribe((data) => {
        this.delegates = data;
      });
  }

  setElectionTypes(event: SelectChangeEvent) {
    this.electionTypes = event.value.electionTypes.filter(
      (element: any) => element.name !== 'Elección Director Ejecutivo'
    );
  }

  assignCandidate(): void {
    if (
      !this.selectedDelegate ||
      !this.selectedElection ||
      !this.selectedQuadrant
    ) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }
    this.saveInProgress = true;
    this.candidateService
      .assignCandidate(
        this.selectedDelegate.id,
        this.selectedElection.id,
        this.selectedQuadrant.id
      )
      .subscribe({
        next: (newCandidate) => {
          this.candidates.push(newCandidate);
          this.errorMessage = '';
          this.saveInProgress = false;
          this.showFormDialog = false;
          this.selectedDelegate = undefined;
        },
        error: (err) => {
          this.errorMessage = 'Error al asignar candidato';
          console.error(err);
          this.saveInProgress = false;
        },
      });
  }
}
