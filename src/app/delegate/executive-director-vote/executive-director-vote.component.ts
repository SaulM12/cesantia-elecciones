import { ExecutiveDirectorVoteService } from './../../helpers/services/executive-director/executive-director-vote.service';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Delegate } from '../../helpers/models/delegate/delegate';
import { ExecutiveDirectorVoteCountDto } from '../../helpers/models/executive-director/executive-director-vote-count-dto';
import { Period } from '../../helpers/models/organization/period';
import { ExecutiveDirectorVote } from '../../helpers/models/executive-director/executive-director-vote';
import { AuthService } from '../../helpers/services/system/auth.service';
import { DelegateService } from '../../helpers/services/delegate/delegate.service';
import { ToastService } from '../../helpers/services/system/toast.service';
import { switchMap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-executive-director-vote',
  imports: [CardModule, ButtonModule],
  templateUrl: './executive-director-vote.component.html',
  styleUrl: './executive-director-vote.component.scss',
})
export class ExecutiveDirectorVoteComponent {
  delegate: Delegate = {} as Delegate;
  directorVotes: ExecutiveDirectorVoteCountDto[] = [];
  period: Period = {
    id: 1,
    description: '2025',
    yearPeriod: '2025',
  };
  voteInProgress: boolean = false;
  prevDelegateVote: ExecutiveDirectorVote | undefined;
  userIp = '';
  constructor(
    private readonly authService: AuthService,
    private readonly delegateService: DelegateService,
    private readonly executiveDirectorVoteService: ExecutiveDirectorVoteService,
    private readonly toastService: ToastService,
    private readonly sanitizer: DomSanitizer,
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
        this.delegate = delegateInfo;
        this.getDelegateVoteCountByQuadrantId(delegateInfo.grade.quadrant.id);
        this.verifyVote(delegateInfo.ci);
      });
  }

  getDelegateVoteCountByQuadrantId(quadrantId: number) {
    this.executiveDirectorVoteService.countVotesByNominee().subscribe({
      next: (res) => {
        this.directorVotes = res;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }

  vote(delegate: Delegate, nomineId: number, ip:string) {
    this.voteInProgress = true;
    this.executiveDirectorVoteService.castVote(nomineId, delegate, ip).subscribe({
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
    this.executiveDirectorVoteService
      .getVoteByDelegateCi(delegateCi)
      .subscribe({
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
  decodeImage(base64String: string) {
    const imageUrl = `data:image/*;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
