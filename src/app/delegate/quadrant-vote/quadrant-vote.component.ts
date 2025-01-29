import { Component } from '@angular/core';
import { AuthService } from '../../helpers/services/system/auth.service';
import { switchMap } from 'rxjs';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { Delegate } from '../../helpers/models/delegate/delegate';
import { DelegateVote } from '../../helpers/models/elections/delegate-vote';
import { DelegateVoteService } from '../../helpers/services/delegate/delegate-vote.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import DelegateVoteCountDto from '../../helpers/models/elections/delegate-vote-count-dto';
import { Period } from '../../helpers/models/organization/period';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-quadrant-vote',
  imports: [CardModule, ButtonModule],
  templateUrl: './quadrant-vote.component.html',
  styleUrl: './quadrant-vote.component.scss',
})
export class QuadrantVoteComponent {
  delegate: Delegate = {} as Delegate;
  delegateVotes: DelegateVoteCountDto[] = [];
  period: Period = {
    id: 1,
    description: '2025',
    yearPeriod: '2025',
  };
  voteInProgress: boolean = false;
  prevDelegateVote: DelegateVote | undefined;
  constructor(
    private readonly authService: AuthService,
    private readonly delegateService: DelegateService,
    private readonly delegateVoteService: DelegateVoteService,
    private readonly toastService: ToastService,
    private readonly sanitizer:DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService
      .getUserDetails()
      .pipe(
        switchMap((userDetails) => {
          return this.delegateService.getByCi(userDetails.ci);
        })
      )
      .subscribe((delegateInfo) => {
        this.delegate = delegateInfo;
        this.getDelegateVoteCountByQuadrantId(delegateInfo.grade.quadrant.id);
        this.verifyVote(delegateInfo.ci);
      });
  }

  getDelegateVoteCountByQuadrantId(quadrantId: number) {
    this.delegateVoteService
      .getCandidatesWithVoteCountByQuadrantId(quadrantId)
      .subscribe({
        next: (delegateVoteCount) => {
          this.delegateVotes = delegateVoteCount;
        },
        error: (err) => {
          this.toastService.showError('Error', err.error?.message);
        },
      });
  }

  decodeImage(base64String: string) {
    const imageUrl = `data:image/*;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  vote(delegate: Delegate, delegateVoteCountDto: DelegateVoteCountDto) {
    let delegateVote = {
      delegate: delegate,
      candidate: { id: delegateVoteCountDto.candidateId },
      period: this.period,
      voteDate: new Date(),
      voteControl: `${delegate.ci}`,
    };
    this.voteInProgress = true;
    this.delegateVoteService.vote(delegateVote).subscribe({
      next: () => {
        this.toastService.showSuccess('Voto', 'Voto registrado');
        this.voteInProgress = false;
        this.verifyVote(delegate.ci);
      },
      error: (err) => {
        this.toastService.showError('Error', err.errror?.message);
        this.voteInProgress = false;
      },
    });
  }

  verifyVote(delegateCi: string) {
    this.delegateVoteService.getVoteByDelegateCi(delegateCi).subscribe({
      next: (delegateVote) => {
        if (delegateVote) {
          this.prevDelegateVote = delegateVote;
        } else {
          this.prevDelegateVote = undefined;
        }
      },
      error: (err) => {
        this.prevDelegateVote = undefined;
      },
    });
  }
}
