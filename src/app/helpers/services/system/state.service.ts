import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { State } from '../../models/system/state';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {

 apiUrl = `${environment.apiUrl}state`;

  constructor(private readonly http: HttpClient) {}

  get(): Observable<State[]> {
    return this.http.get<State[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<State> {
    return this.http.get<State>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  create(state: State): Observable<State> {
    return this.http.post<State>(this.apiUrl, state, {
      withCredentials: true,
    });
  }

  update(state: State): Observable<State> {
    return this.http.post<State>(`${this.apiUrl}`, state, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
