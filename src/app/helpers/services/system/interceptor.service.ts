import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  service_count = 0;

  constructor(
    private readonly toastSrv: ToastService,
    private readonly authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service_count++;
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 500) {
          setTimeout(() => {
            this.toastSrv.clear();
            this.toastSrv.showError(
              'Error interno',
              'Si el problema persiste, por favor envíe un email a soporte@medicaltag.com.mx.'
            );
          }, 50);
        }
        if (err.status === 403 || err.status === 401) {
          this.authService.logOutInterceptor();
          let infoMessage =
            err.status === 403
              ? 'No autorizado'
              : 'Error de autenticación, inicie sesión nuevamente';
          this.toastSrv.clear();
          this.toastSrv.showInfo('Usuario no autorizado', infoMessage);
          return throwError(() => err);
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}

export const InterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];
