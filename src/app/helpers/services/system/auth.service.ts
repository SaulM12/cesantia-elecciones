import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiMessage } from '../../models/system/api-message';
import { Observable, shareReplay, Subject } from 'rxjs';
import { RegisterUser, User } from '../../models/user/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}auth`;
  user$: Observable<User> | null = null;
  private readonly _refresh$ = new Subject<boolean>();
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(userName: string, password: string) {
    return this.http.post<ApiMessage>(
      `${this.apiUrl}/login`,
      { userName, password },
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
  logOutInterceptor() {
    this.http
      .post(`${this.apiUrl}/logout`, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['/inicio']);
      });
  }

  getUserDetails(): Observable<User> {
    if (!this.user$) {
      this.user$ = this.http
        .get<User>(`${this.apiUrl}/details`, {
          withCredentials: true,
        })
        .pipe(shareReplay(1));
    }
    return this.user$;
  }

  get refresh$() {
    return this._refresh$;
  }

  refreshUserDetails() {
    this._refresh$.next(true);
  }

  registerUser(newUser: RegisterUser) {
    return this.http.post<ApiMessage>(`${this.apiUrl}/register`, newUser, {
      withCredentials: true,
    });
  }

  clearCache() {
    this.user$ = null;
  }
}
