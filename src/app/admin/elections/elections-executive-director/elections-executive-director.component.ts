import { ChangeDetectorRef, Component } from '@angular/core';
import { ExecutiveDirectorVoteService } from '../../../helpers/services/executive-director/executive-director-vote.service';
import { ExecutiveDirectorVoteCountDto } from '../../../helpers/models/executive-director/executive-director-vote-count-dto';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastService } from '../../../helpers/services/system/toast.service';

@Component({
  selector: 'app-elections-executive-director',
  imports: [CardModule, ChartModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './elections-executive-director.component.html',
  styleUrl: './elections-executive-director.component.scss',
})
export class ElectionsExecutiveDirectorComponent {
  votes: ExecutiveDirectorVoteCountDto[] = [];
  data: any;
  options: any;
  loading: boolean = false;
  tie:boolean=false

  constructor(
    private readonly executiveDirectorVoteService: ExecutiveDirectorVoteService,
    private readonly cd: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getVotes();
  }

  getVotes() {
    this.loading = true;
    this.executiveDirectorVoteService
      .countVotesByNominee()
      .subscribe((votes) => {
        this.votes = votes
        this.initChart(votes);
        this.tie = this.checkForTie(votes);
        this.loading = false;
      });
  }

  checkForTie(directorVotes: ExecutiveDirectorVoteCountDto[]): boolean {
    if (!directorVotes || directorVotes.length === 0) {
      return false; // No hay votos, no puede haber empate
    }

    const maxVotes = Math.max(
      ...directorVotes.map((candidate) => candidate.voteCount)
    );

    // Contar cuántos candidatos tienen ese número de votos
    const tiedCandidates = directorVotes.filter(
      (candidate) => candidate.voteCount === maxVotes
    );

    return tiedCandidates.length > 1; // Hay empate si más de un candidato tiene los votos máximos
  }

  reset() {
    this.loading = true;
    this.executiveDirectorVoteService.resetElection().subscribe({
      next: () => {
        this.toastService.showSuccess(
          'Restablecido',
          'Los votos se han restablecido'
        );
        this.getVotes();
      },
    });
  }

  initChart(delegateVoteCounts: ExecutiveDirectorVoteCountDto[]): void {
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
      labels: sortedResults.map((voteCount) => voteCount.electionName),
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
}
