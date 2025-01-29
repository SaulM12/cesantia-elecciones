import {
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DelegateVoteService } from '../../../helpers/services/delegate/delegate-vote.service';
import DelegateVoteCountDto from '../../../helpers/models/elections/delegate-vote-count-dto';
import { QuadrantService } from '../../../helpers/services/organization/quadrant.service';
import { Quadrant } from '../../../helpers/models/organization/quadrant';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-election-detail',
  imports: [CardModule, ChartModule, ButtonModule],
  templateUrl: './election-detail.component.html',
  styleUrl: './election-detail.component.scss',
})
export class ElectionDetailComponent {
  delegateVoteCounts: DelegateVoteCountDto[] = [];
  selectedQuadrant!: Quadrant;
  data: any;
  options: any;
  loading: boolean = false;

  constructor(
    private readonly delegateVoteService: DelegateVoteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly quadrantService: QuadrantService,
    private cd: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getDelegateVoteCounts();
    this.getQuadrantById(+id!);
  }

  getQuadrantById(id: number) {
    this.quadrantService.getQuadrant(id).subscribe({
      next: (data) => {
        this.selectedQuadrant = data;
      },
    });
  }
  getDelegateVoteCounts() {
    this.loading = true;
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.delegateVoteService
      .getCandidatesWithVoteCountByQuadrantId(+id!)
      .subscribe({
        next: (data) => {
          this.delegateVoteCounts = data;
          this.initChart(data);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  initChart(delegateVoteCounts: DelegateVoteCountDto[]): void {
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
      labels: delegateVoteCounts.map((voteCount) => voteCount.candidateName),
      datasets: [
        {
          data: delegateVoteCounts.map((voteCount) => voteCount.voteCount),
          backgroundColor: delegateVoteCounts.map((_, index) =>
            documentStyle.getPropertyValue(colors[index % colors.length])
          ),
          hoverBackgroundColor: delegateVoteCounts.map((_, index) =>
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
