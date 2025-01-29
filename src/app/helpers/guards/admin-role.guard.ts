import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  CanActivateFn,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { AuthService } from '../services/system/auth.service';
import { RoleList } from '../enums/role_list';

export const AdminRoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const userService = inject(AuthService);
  const router = inject(Router);

  return userService.getUserDetails().pipe(
    take(1),
    map((data) => {
      return data.role.name === RoleList.ROLE_ADMIN;
    }),
    map((isAdmin) => {
        console.log(isAdmin);
        
      if (!isAdmin) {
        userService.clearCache()
        userService.logOutInterceptor();
        return router.createUrlTree(['/']);
      }
      return true;
    }),
    catchError(() => {
      return of(router.createUrlTree(['/']));
    })
  );
};
