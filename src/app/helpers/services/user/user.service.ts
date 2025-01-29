import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = `${environment.apiUrl}user`;

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL, { withCredentials: true });
  }

  update(user: User) {
    return this.http.put<User>(`${this.apiURL}/${user.id}`, user, {
      withCredentials: true,
    });
  }
}
