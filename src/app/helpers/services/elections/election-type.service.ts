import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectionType } from '../../models/elections/election-type';

@Injectable({
  providedIn: 'root',
})
export class ElectionTypeService {
  apiUrl = `${environment.apiUrl}election-types`;

  constructor(private readonly http: HttpClient) {}

  getAllElectionTypes(): Observable<ElectionType[]> {
    return this.http.get<ElectionType[]>(`${this.apiUrl}`, {
      withCredentials: true,
    });
  }

  getElectionTypeById(id: number): Observable<ElectionType> {
    return this.http.get<ElectionType>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getElectionTypesByQuadrant(quadrantId: number): Observable<ElectionType[]> {
    return this.http.get<ElectionType[]>(
      `${this.apiUrl}/quadrant/${quadrantId}`,
      { withCredentials: true }
    );
  }

  createElectionType(
    electionType: ElectionType,
  ): Observable<ElectionType> {
    return this.http.post<ElectionType>(
      `${this.apiUrl}`,
      electionType,
      { withCredentials: true }
    );
  }

  updateElectionType(
    id: number,
    electionType: ElectionType
  ): Observable<ElectionType> {
    return this.http.put<ElectionType>(`${this.apiUrl}/${id}`, electionType, {
      withCredentials: true,
    });
  }

  deleteElectionType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  enableElection(id: number): Observable<ElectionType> {
    return this.http.put<ElectionType>(
      `${this.apiUrl}/${id}/enable`,
      {},
      { withCredentials: true }
    );
  }

  disableElection(id: number): Observable<ElectionType> {
    return this.http.put<ElectionType>(
      `${this.apiUrl}/${id}/disable`,
      {},
      { withCredentials: true }
    );
  }
}
