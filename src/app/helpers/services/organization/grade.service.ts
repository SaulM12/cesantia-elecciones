import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../../models/organization/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
 apiUrl = `${environment.apiUrl}grade`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  create(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.apiUrl, grade, {
      withCredentials: true,
    });
  }

  update(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(`${this.apiUrl}`, grade, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
