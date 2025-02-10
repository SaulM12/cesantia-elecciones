import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Delegate } from '../../models/delegate/delegate';
import { ExecutiveDirectorVote } from '../../models/executive-director/executive-director-vote';
import { ExecutiveDirectorVoteCountDto } from '../../models/executive-director/executive-director-vote-count-dto';

@Injectable({
  providedIn: 'root',
})
export class ExecutiveDirectorVoteService {
  apiUrl = `${environment.apiUrl}director-votes`;

  constructor(private readonly http: HttpClient) {}

  castVote(nomineeId: number, delegate: Delegate, userIp: string) {
    const url = `${this.apiUrl}/${nomineeId}/vote/${userIp}`;
    return this.http.post<void>(url, delegate, { withCredentials: true });
  }

  countVotesByNominee(): Observable<ExecutiveDirectorVoteCountDto[]> {
    const url = `${this.apiUrl}/count`;
    return this.http.get<ExecutiveDirectorVoteCountDto[]>(url, {
      withCredentials: true,
    });
  }

  getVoteByDelegateCi(ci: string) {
    const url = `${this.apiUrl}/delegate/${ci}`;
    return this.http.get<ExecutiveDirectorVote>(url, { withCredentials: true });
  }

  resetElection() {
    return this.http.delete(`${this.apiUrl}/reset`, { withCredentials: true });
  }
}
