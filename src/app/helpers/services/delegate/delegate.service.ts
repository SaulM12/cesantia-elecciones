import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delegate } from '../../models/delegate/delegate';

@Injectable({
  providedIn: 'root',
})
export class DelegateService {
  apiUrl = `${environment.apiUrl}delegate`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Delegate[]> {
    return this.http.get<Delegate[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Delegate> {
    return this.http.get<Delegate>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getByCi(ci: string): Observable<Delegate> {
    return this.http.get<Delegate>(`${this.apiUrl}/by-ci/${ci}`, {
      withCredentials: true,
    });
  }

  create(delegate: Delegate): Observable<Delegate> {
    return this.http.post<Delegate>(this.apiUrl, delegate, {
      withCredentials: true,
    });
  }

  update(delegate: Delegate): Observable<Delegate> {
    return this.http.put<Delegate>(`${this.apiUrl}/${delegate.id}`, delegate, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getDelegatesWithoutInvitationByQuadrant(
    quadrantId: number
  ): Observable<Delegate[]> {
    const url = `${this.apiUrl}/quadrant/${quadrantId}/without-invitation`;
    return this.http.get<Delegate[]>(url, { withCredentials: true });
  }

  setCandidateToTrue(ci: string): Observable<void> {
    const url = `${this.apiUrl}/${ci}/set-candidate`;
    return this.http.put<void>(url, null, { withCredentials: true });
  }

  updateEnableToVote(status: boolean): Observable<void> {
    const url = `${this.apiUrl}/enable-to-vote`;
    return this.http.put<void>(url, null, {
      withCredentials: true,
      params: { status: status },
    });
  }

  uploadDelegateImage(ci: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.apiUrl}/${ci}/image`, formData, {
      responseType: 'text',
      withCredentials: true,
    });
  }
}
