import { ElectionAuthorityService } from './../../../helpers/services/elections/election-authority.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DelegateVoteService } from '../../../helpers/services/delegate/delegate-vote.service';
import DelegateVoteCountDto from '../../../helpers/models/elections/delegate-vote-count-dto';
import { QuadrantService } from '../../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../../helpers/models/organization/quadrant';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { FormsModule, NgForm } from '@angular/forms';
import { ElectionType } from '../../../helpers/models/elections/election-type';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastService } from '../../../helpers/services/system/toast.service';
import { DatePipe, NgClass } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import ElectionAuthority from '../../../helpers/models/elections/election-authority';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-election-detail',
  imports: [
    CardModule,
    ChartModule,
    ButtonModule,
    Select,
    FormsModule,
    ProgressSpinnerModule,
    DatePipe,
    DialogModule,
    InputText,
    NgClass,
  ],
  templateUrl: './election-detail.component.html',
  styleUrl: './election-detail.component.scss',
})
export class ElectionDetailComponent {
  delegateVoteCounts: DelegateVoteCountDto[] = [];
  selectedQuadrant!: Quadrant;
  data: any;
  options: any;
  loading: boolean = false;
  selectedElection: ElectionType | undefined;
  tie: boolean = false;
  reportDate = new Date();
  visibleAuthoritiesModal: boolean = false;
  authorities: ElectionAuthority[] = [];
  secretary: ElectionAuthority | undefined;
  president: ElectionAuthority | undefined;
  electionAuthority = {} as ElectionAuthority;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  @ViewChild('form') form!: NgForm;

  constructor(
    private readonly delegateVoteService: DelegateVoteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly quadrantService: QuadrantService,
    private readonly cd: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer,
    private readonly toastService: ToastService,
    private readonly electionAuthorityService: ElectionAuthorityService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getQuadrantById(+id!);
  }

  getQuadrantById(id: number) {
    this.quadrantService.getQuadrant(id).subscribe({
      next: (data) => {
        data.electionTypes = data.electionTypes.filter(
          (element) => element.name !== 'Elección Director Ejecutivo'
        );
        this.selectedQuadrant = data;
      },
    });
  }

  getDelegateVoteCounts() {
    this.loading = true;
    this.reportDate = new Date();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getElectionAuthorities(this.selectedElection?.id!, +id!);
    this.delegateVoteService
      .getCandidatesWithVoteCountByQuadrantAndElectionType(
        +id!,
        this.selectedElection?.id!
      )
      .subscribe({
        next: (data) => {
          this.delegateVoteCounts = data;
          this.initChart(data);
          this.loading = false;
          this.tie = this.checkForTie(data);
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  getElectionAuthorities(electionId: number, quadrantId: number) {
    this.electionAuthorityService
      .getByElectionAndQuadrant(electionId, quadrantId)
      .subscribe((data) => {
        this.president = undefined;
        this.secretary = undefined;
        this.visibleAuthoritiesModal = false;
        data.forEach((element) => {
          if (element.role === 'PRESIDENTE') {
            this.president = element;
          } else {
            this.secretary = element;
          }
        });
      });
  }

  openAuthorityModal(
    role: string,
    quadrant: Quadrant,
    electionType: ElectionType
  ) {
    this.electionAuthority = {} as ElectionAuthority;
    this.electionAuthority.quadrant = quadrant;
    this.electionAuthority.electionType = electionType;
    this.electionAuthority.role = role;
    this.visibleAuthoritiesModal = true;
  }

  saveAuthority() {
    if (this.form.invalid) {
      this.toastService.showError('Error', 'Complete los campos requeridos');
      this.submitted = true;
      return;
    }
    this.saveInProgress = true;
    this.electionAuthorityService
      .createAuthority(this.electionAuthority)
      .subscribe({
        next: () => {
          this.toastService.showInfo(
            'Registrado',
            'Autoridad registrada correctamente'
          );
          this.saveInProgress = false;

          let id = this.activatedRoute.snapshot.paramMap.get('id');
          this.getElectionAuthorities(this.selectedElection?.id!, +id!);
        },
        error: () => {
          this.saveInProgress = false;
          this.toastService.showError('Error', '');
        },
      });
  }

  checkForTie(delegateVotes: DelegateVoteCountDto[]): boolean {
    if (!delegateVotes || delegateVotes.length === 0) {
      return false; // No hay votos, no puede haber empate
    }

    const maxVotes = Math.max(
      ...delegateVotes.map((candidate) => candidate.voteCount)
    );

    // Contar cuántos candidatos tienen ese número de votos
    const tiedCandidates = delegateVotes.filter(
      (candidate) => candidate.voteCount === maxVotes
    );

    return tiedCandidates.length > 1; // Hay empate si más de un candidato tiene los votos máximos
  }

  getTotalVotes(): number {
    return this.delegateVoteCounts.reduce(
      (sum, vote) => sum + vote.voteCount,
      0
    );
  }

  initChart(delegateVoteCounts: DelegateVoteCountDto[]): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );

    const colors = [
      '--p-gray-500',
      '--p-blue-500',
      '--p-green-500',
      '--p-red-500',
      '--p-orange-500',
      '--p-purple-500',
      '--p-yellow-500',
      '--p-teal-500',
    ];
    const hoverColors = [
      '--p-gray-400',
      '--p-blue-400',
      '--p-green-400',
      '--p-red-400',
      '--p-orange-400',
      '--p-purple-400',
      '--p-yellow-400',
      '--p-teal-400',
    ];

    // Ordenamos los resultados por cantidad de votos DESC para mejorar la visualización
    const sortedResults = [...delegateVoteCounts].sort(
      (a, b) => b.voteCount - a.voteCount
    );

    this.data = {
      labels: sortedResults.map((voteCount) => voteCount.candidateName),
      datasets: [
        {
          label: 'Votos por Candidato',
          data: sortedResults.map((voteCount) => voteCount.voteCount),
          backgroundColor: sortedResults.map((_, index) =>
            documentStyle.getPropertyValue(colors[index % colors.length])
          ),
          hoverBackgroundColor: sortedResults.map((_, index) =>
            documentStyle.getPropertyValue(
              hoverColors[index % hoverColors.length]
            )
          ),
          borderWidth: 1,
          borderColor: '#ffffff',
          barThickness: 20,
        },
      ],
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false, // Ocultamos la leyenda para una mejor visualización
        },
        tooltip: {
          callbacks: {
            label: (context: any) => ` ${context.raw} votos`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 600,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 600,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.cd.markForCheck();
  }

  decodeImage(base64String: string) {
    const imageUrl = `data:image/*;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  resetElections(quadrantId: number, electionTypeId: number) {
    this.loading = true;
    this.delegateVoteService
      .resetElection(electionTypeId, quadrantId)
      .subscribe({
        next: () => {
          this.loading = false;
          this.toastService.showSuccess(
            'Restablecido',
            'Los votos se han restablecido'
          );
          this.getDelegateVoteCounts();
        },
      });
  }
}
