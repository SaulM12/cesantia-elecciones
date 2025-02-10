import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuadrantComponent } from './quadrant/quadrant.component';
import { StateComponent } from './state/state.component';
import { GradeComponent } from './grade/grade.component';
import { UnitComponent } from './unit/unit.component';
import { TablesComponent } from './tables/tables.component';
import { SeatingComponent } from './seating/seating.component';
import { DelegateComponent } from './delegate/delegate.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { UsersComponent } from './users/users.component';
import { ElectionsComponent } from './elections/elections.component';
import { ElectionDetailComponent } from './elections/election-detail/election-detail.component';
import { ExecutiveDirectorNomineeComponent } from './executive-director-nominee/executive-director-nominee.component';
import { ElectionsExecutiveDirectorComponent } from './elections/elections-executive-director/elections-executive-director.component';
import { ElectionTypeComponent } from './election-type/election-type.component';
import { CandidateComponent } from './candidate/candidate.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: '',
        redirectTo: 'delegados',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        component: HomeComponent,
        title: 'Delegados',
      },
      {
        path: 'cuadrantes',
        component: QuadrantComponent,
        title: 'Cuadrantes',
      },
      {
        path: 'estados',
        component: StateComponent,
        title: 'Estados',
      },
      {
        path: 'grados',
        component: GradeComponent,
        title: 'Grados',
      },
      {
        path: 'unidades',
        component: UnitComponent,
        title: 'Unidades',
      },
      {
        path: 'mesas',
        component: TablesComponent,
        title: 'Mesas',
      },
      {
        path: 'asientos',
        component: SeatingComponent,
        title: 'Asientos',
      },
      {
        path: 'delegados',
        component: DelegateComponent,
        title: 'Delegados',
      },
      {
        path: 'invitaciones',
        component: InvitationsComponent,
        title: 'Invitaciones',
      },
      {
        path: 'usuarios',
        component: UsersComponent,
        title: 'Usuarios',
      },
      {
        path: 'votaciones',
        component: ElectionsComponent,
        title: 'Votaciones',
      },
      {
        path: 'votaciones/:id',
        component: ElectionDetailComponent,
        title: 'Resultados de votación',
      },
      {
        path: 'votaciones-director-general',
        component: ElectionsExecutiveDirectorComponent,
        title: 'Votaciones para Director General',
      },
      {
        path: 'terna-director-general',
        component: ExecutiveDirectorNomineeComponent,
        title: 'Terna para Director General',
      },
      {
        path: 'tipo-elecciones',
        component: ElectionTypeComponent,
        title: 'Tipos elecciones',
      },
      {
        path: 'candidatos',
        component: CandidateComponent,
        title: 'Candidatos',
      },
      {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

export default routes;
