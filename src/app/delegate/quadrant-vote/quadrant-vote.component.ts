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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ElectionType } from '../../helpers/models/elections/election-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quadrant-vote',
  imports: [CardModule, ButtonModule, RouterModule],
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
  electionType!: ElectionType;
  prevDelegateVote: DelegateVote | undefined;
  userIp: string = '';
  constructor(
    private readonly authService: AuthService,
    private readonly delegateService: DelegateService,
    private readonly delegateVoteService: DelegateVoteService,
    private readonly toastService: ToastService,
    private readonly sanitizer: DomSanitizer,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getUserIp();
  }
  getUserIp(): void {
    this.http
      .get<{ ip: string }>('https://api64.ipify.org?format=json')
      .subscribe(
        (response) => {
          this.userIp = response.ip;
        },
        (error) => {
          console.error('Error al obtener la IP:', error);
        }
      );
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
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.delegate = delegateInfo;
        this.isElectionEnabled(+id!);
        this.getDelegateVoteCountByQuadrantId(delegateInfo.grade.quadrant.id);
        this.verifyVote(delegateInfo.ci);
      });
  }

  isElectionEnabled(electionId: number) {
    const foundElection = this.delegate?.grade?.quadrant?.electionTypes?.find(
      (e) => e.id === electionId
    );

    if (foundElection) {
      this.electionType = foundElection; // Asigna el objeto encontrado
      if (!foundElection.enabled) {
        this.toastService.showError('No autorizado', 'Elección no habilitada');
        this.router.navigateByUrl('delegate');
      } // Retorna si está habilitado
    } else {
      this.toastService.showError('No autorizado', 'Elección no encontrada');
      this.router.navigateByUrl('delegate');
    }

    // Si no encuentra la elección, retorna false
  }

  getDelegateVoteCountByQuadrantId(quadrantId: number) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.delegateVoteService
      .getCandidatesWithVoteCountByQuadrantAndElectionType(quadrantId, +id!)
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

  vote(
    delegate: Delegate,
    delegateVoteCountDto: DelegateVoteCountDto,
    electionType: ElectionType,
    ip: string
  ) {
    let delegateVote = {
      delegate: delegate,
      candidate: { id: delegateVoteCountDto.candidateId },
      period: this.period,
      voteDate: new Date(),
      voteControl: `${delegate.ci}`,
      electionType: electionType,
      userIp: ip,
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
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.delegateVoteService.getVoteByDelegateCi(delegateCi, +id!).subscribe({
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
