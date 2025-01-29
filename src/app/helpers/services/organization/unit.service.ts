import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../models/organization/unit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  apiUrl = `${environment.apiUrl}unit`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  create(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.apiUrl, unit, {
      withCredentials: true,
    });
  }

  update(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${this.apiUrl}`, unit, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
