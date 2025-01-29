import { ChangeDetectorRef, Component } from '@angular/core';
import { ExecutiveDirectorVoteService } from '../../../helpers/services/executive-director/executive-director-vote.service';
import { ExecutiveDirectorVoteCountDto } from '../../../helpers/models/executive-director/executive-director-vote-count-dto';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-elections-executive-director',
  imports: [CardModule, ChartModule, ButtonModule],
  templateUrl: './elections-executive-director.component.html',
  styleUrl: './elections-executive-director.component.scss',
})
export class ElectionsExecutiveDirectorComponent {
  votes: ExecutiveDirectorVoteCountDto[] = [];
  data: any;
  options: any;
  loading: boolean = false;

  constructor(
    private readonly executiveDirectorVoteService: ExecutiveDirectorVoteService,
    private readonly cd: ChangeDetectorRef,
       private readonly sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.getVotes();
  }

  getVotes() {

    this.executiveDirectorVoteService
      .countVotesByNominee()
      .subscribe((votes) => {
        this.votes = votes;
        this.initChart(votes);
        this.loading = false;
      });
  }

  initChart(executiveDirectorVotes: ExecutiveDirectorVoteCountDto[]): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const colors = [
      '--p-cyan-500',
      '--p-orange-500',
      '--p-gray-500',
      '--p-blue-500',
      '--p-green-500',
      '--p-red-500',
    ];
    const hoverColors = [
      '--p-cyan-400',
      '--p-orange-400',
      '--p-gray-400',
      '--p-blue-400',
      '--p-green-400',
      '--p-red-400',
    ];

    this.data = {
      labels: executiveDirectorVotes.map((voteCount) => voteCount.electionName),
      datasets: [
        {
          data: executiveDirectorVotes.map((voteCount) => voteCount.voteCount),
          backgroundColor: executiveDirectorVotes.map((_, index) =>
            documentStyle.getPropertyValue(colors[index % colors.length])
          ),
          hoverBackgroundColor: executiveDirectorVotes.map((_, index) =>
            documentStyle.getPropertyValue(
              hoverColors[index % hoverColors.length]
            )
          ),
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
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
