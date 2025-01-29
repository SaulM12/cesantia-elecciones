import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DelegateType } from '../../models/delegate/delegate-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelegateTypeService {
apiUrl = `${environment.apiUrl}delegate-type`;

  constructor(private readonly http:HttpClient) { }

   getAll(): Observable<DelegateType[]> {
      return this.http.get<DelegateType[]>(this.apiUrl, { withCredentials: true });
    }
  
    getById(id: number): Observable<DelegateType> {
      return this.http.get<DelegateType>(`${this.apiUrl}/${id}`, {
        withCredentials: true,
      });
    }
  
    create(grade: DelegateType): Observable<DelegateType> {
      return this.http.post<DelegateType>(this.apiUrl, grade, {
        withCredentials: true,
      });
    }
  
    update(grade: DelegateType): Observable<DelegateType> {
      return this.http.post<DelegateType>(`${this.apiUrl}`, grade, {
        withCredentials: true,
      });
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, {
        withCredentials: true,
      });
    }
}
