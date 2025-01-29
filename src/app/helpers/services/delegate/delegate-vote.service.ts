import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DelegateVoteCountDto from '../../models/elections/delegate-vote-count-dto';
import { DelegateVote } from '../../models/elections/delegate-vote';

@Injectable({
  providedIn: 'root',
})
export class DelegateVoteService {
  apiUrl = `${environment.apiUrl}delegate-vote`;

  constructor(private readonly http: HttpClient) {}

  getCandidatesWithVoteCountByQuadrantId(
    quadrantId: number
  ): Observable<DelegateVoteCountDto[]> {
    return this.http.get<DelegateVoteCountDto[]>(
      `${this.apiUrl}/candidates-by-quadrant/${quadrantId}`,
      { withCredentials: true }
    );
  }

  vote(delegateVote: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, delegateVote, {
      withCredentials: true,
    });
  }

  getVoteByDelegateCi(ci: string): Observable<DelegateVote> {
    return this.http.get<DelegateVote>(`${this.apiUrl}/by-delegate-ci/${ci}`, {
      withCredentials: true,
    });
  }
}
