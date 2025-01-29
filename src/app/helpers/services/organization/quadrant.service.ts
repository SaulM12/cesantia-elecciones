import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quadrant, QuadrantDto } from '../../models/organization/quadrant';

@Injectable({
  providedIn: 'root',
})
export class QuadrantService {
  apiUrl = `${environment.apiUrl}quadrants`;

  constructor(private readonly http: HttpClient) {}

  getQuadrants(): Observable<Quadrant[]> {
    return this.http.get<Quadrant[]>(this.apiUrl, { withCredentials: true });
  }

  getQuadrantsWithTables(): Observable<QuadrantDto[]> {
    return this.http.get<QuadrantDto[]>(
      `${this.apiUrl}/with-tables-and-invitations`,
      { withCredentials: true }
    );
  }

  getQuadrant(id: number): Observable<Quadrant> {
    return this.http.get<Quadrant>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  createQuadrant(quadrant: Quadrant): Observable<Quadrant> {
    return this.http.post<Quadrant>(this.apiUrl, quadrant, {
      withCredentials: true,
    });
  }

  updateQuadrant(quadrant: Quadrant): Observable<Quadrant> {
    return this.http.post<Quadrant>(`${this.apiUrl}`, quadrant, {
      withCredentials: true,
    });
  }

  deleteQuadrant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
