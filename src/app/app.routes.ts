import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminRoleGuard } from './helpers/guards/admin-role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    title: 'Iniciar Sesión',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    canActivate: [AdminRoleGuard],
  },
  {
    path: 'delegate',
    loadChildren: () => import('./delegate/delegate.routes'),
    //canActivate: [AdminGuard],
  },
  {
    path: 'scanner',
    loadComponent: () =>
      import('./scanner/scanner.component').then((m) => m.ScannerComponent),
    title: 'Escaner',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
