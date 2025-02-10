import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateElection } from '../../models/elections/candidate-election';

@Injectable({
  providedIn: 'root',
})
export class CandidateElectionsService {
  apiUrl = `${environment.apiUrl}candidates`;
  constructor(private readonly http: HttpClient) {}

  assignCandidate(
    delegateId: number,
    electionTypeId: number,
    quadrantId: number
  ): Observable<CandidateElection> {
    const params = new HttpParams()
      .set('delegateId', delegateId)
      .set('electionTypeId', electionTypeId)
      .set('quadrantId', quadrantId);

    return this.http.post<CandidateElection>(
      `${this.apiUrl}/assign`,
      {},
      { params, withCredentials: true }
    );
  }

  getCandidatesByElectionTypeAndQuadrant(
    electionTypeId: number,
    quadrantId: number
  ): Observable<CandidateElection[]> {
    const params = new HttpParams()
      .set('electionTypeId', electionTypeId)
      .set('quadrantId', quadrantId);

    return this.http.get<CandidateElection[]>(
      `${this.apiUrl}/by-election-quadrant`,
      { params, withCredentials: true }
    );
  }
}
