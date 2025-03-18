import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import ElectionAuthority from '../../models/elections/election-authority';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectionAuthorityService {
  apiUrl = `${environment.apiUrl}election-authorities`;

  constructor(private readonly http: HttpClient) {}

  getAllAuthorities(): Observable<ElectionAuthority[]> {
    return this.http.get<ElectionAuthority[]>(`${this.apiUrl}`, {
      withCredentials: true,
    });
  }

  getAuthorityById(id: number): Observable<ElectionAuthority> {
    return this.http.get<ElectionAuthority>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getByElectionAndQuadrant(
    electionTypeId: number,
    quadrantId: number
  ): Observable<ElectionAuthority[]> {
    return this.http.get<ElectionAuthority[]>(
      `${this.apiUrl}/by-election-and-quadrant`,
      {
        params: { electionTypeId, quadrantId },
        withCredentials: true,
      }
    );
  }

  createAuthority(authority: ElectionAuthority): Observable<ElectionAuthority> {
    return this.http.post<ElectionAuthority>(`${this.apiUrl}`, authority, {
      withCredentials: true,
    });
  }

  updateAuthority(
    id: number,
    authority: ElectionAuthority
  ): Observable<ElectionAuthority> {
    return this.http.put<ElectionAuthority>(`${this.apiUrl}/${id}`, authority, {
      withCredentials: true,
    });
  }

  deleteAuthority(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
