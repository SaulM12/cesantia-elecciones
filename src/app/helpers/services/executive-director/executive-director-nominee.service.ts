import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExecutiveDirectorNominee } from '../../models/executive-director/executive-director-nominee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExecutiveDirectorNomineeService {
  apiUrl = `${environment.apiUrl}nominees`;

  constructor(private readonly http: HttpClient) {}

  getAllNominees(): Observable<ExecutiveDirectorNominee[]> {
    return this.http.get<ExecutiveDirectorNominee[]>(`${this.apiUrl}`, {
      withCredentials: true,
    });
  }

  createNominee(nominee: ExecutiveDirectorNominee) {
    return this.http.post<ExecutiveDirectorNominee>(`${this.apiUrl}`, nominee, {
      withCredentials: true,
    });
  }

  updateNominee(nomineeDetails: ExecutiveDirectorNominee) {
    return this.http.put<ExecutiveDirectorNominee>(
      `${this.apiUrl}/${nomineeDetails.id}`,
      nomineeDetails,
      {
        withCredentials: true,
      }
    );
  }

  uploadNomineeImage(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.put(`${this.apiUrl}/${id}/image`, formData, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  getNomineeImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/image`, {
      responseType: 'blob',
      withCredentials: true,
    });
  }
}
