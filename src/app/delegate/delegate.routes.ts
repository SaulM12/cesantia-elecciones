import { Routes } from '@angular/router';
import { DelegateHomeComponent } from './delegate-home/delegate-home.component';
import { InvitationComponent } from './invitation/invitation.component';
import { QuadrantVoteComponent } from './quadrant-vote/quadrant-vote.component';
import { ExecutiveDirectorVoteComponent } from './executive-director-vote/executive-director-vote.component';
import { ElectionsMenuComponent } from './elections-menu/elections-menu.component';

const delegateRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./delegate.component').then((m) => m.DelegateComponent),
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        component: ElectionsMenuComponent,
        title: 'Inicio',
      },
      {
        path: 'invitacion',
        component: InvitationComponent,
        title: 'Invitación',
      },
      {
        path: 'votacion-cuadrante/:id',
        component: QuadrantVoteComponent,
        title: 'Votación por cuadrante',
      },
      {
        path: 'votacion-director',
        component: ExecutiveDirectorVoteComponent,
        title: 'Votación por director ejecutivo',
      },
      {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

export default delegateRoutes;
