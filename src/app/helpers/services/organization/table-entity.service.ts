import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TableEntity } from '../../models/organization/table-entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TableEntityService {
  apiUrl = `${environment.apiUrl}table`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<TableEntity[]> {
    return this.http.get<TableEntity[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<TableEntity> {
    return this.http.get<TableEntity>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  create(tableEntity: TableEntity): Observable<TableEntity> {
    return this.http.post<TableEntity>(this.apiUrl, tableEntity, {
      withCredentials: true,
    });
  }

  update(tableEntity: TableEntity): Observable<TableEntity> {
    return this.http.post<TableEntity>(`${this.apiUrl}`, tableEntity, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
