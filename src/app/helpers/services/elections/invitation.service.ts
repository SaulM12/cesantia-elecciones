import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitation } from '../../models/elections/invitation';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  apiUrl = `${environment.apiUrl}invitation`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(this.apiUrl, { withCredentials: true });
  }

  getAllWithDelegates(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.apiUrl}/with-delegates`, {
      withCredentials: true,
    });
  }

  getById(id: number): Observable<Invitation> {
    return this.http.get<Invitation>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getByDelegateCi(ci: string): Observable<Invitation> {
    return this.http.get<Invitation>(`${this.apiUrl}/by-delegate-ci/${ci}`, {
      withCredentials: true,
    });
  }

  create(invitation: Invitation): Observable<Invitation> {
    return this.http.post<Invitation>(this.apiUrl, invitation, {
      withCredentials: true,
    });
  }

  assignDelegateToInvitation(
    invitationId: number,
    delegateId: number
  ): Observable<Invitation> {
    return this.http.put<Invitation>(
      `${this.apiUrl}/${invitationId}/assign-delegate/${delegateId}`,
      null,
      {
        withCredentials: true,
      }
    );
  }

  update(invitation: Invitation): Observable<Invitation> {
    return this.http.post<Invitation>(`${this.apiUrl}`, invitation, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  confirmScan(id: number): Observable<Invitation> {
    return this.http.put<Invitation>(`${this.apiUrl}/${id}/scan`, null, {
      withCredentials: true,
    });
  }

  getTotalInvitations(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`, {
      withCredentials: true,
    });
  }

  getScannedInvitations(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/scanned`, {
      withCredentials: true,
    });
  }
}
