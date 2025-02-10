import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../helpers/services/system/auth.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterModule, Menubar],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  items: MenuItem[] = [
    {
      label: 'Delegados',
      icon: 'pi pi-user',
      routerLink: '/admin/delegados',
    },
    {
      label: 'Sistema',
      icon: 'pi pi-microchip',
      items: [
        {
          label: 'Estados',
          icon: 'pi pi-list',
          routerLink: '/admin/estados',
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-user',
          routerLink: '/admin/usuarios',
        },
      ],
    },
    {
      label: 'Organización',
      icon: 'pi pi-sitemap',
      items: [
        {
          label: 'Cuadrantes',
          icon: 'pi pi-th-large',
          routerLink: '/admin/cuadrantes',
        },
        {
          label:'Tipo elecciones',
          icon: 'pi pi-fw pi-slack',
          routerLink: '/admin/tipo-elecciones',
        },
        {
          label: 'Grados',
          icon: 'pi pi-user-minus',
          routerLink: '/admin/grados',
        },
        {
          label: 'Unidades',
          icon: 'pi pi-warehouse',
          routerLink: '/admin/unidades',
        },
        {
          label: 'Mesas',
          icon: 'pi pi-table',
          routerLink: '/admin/mesas',
        },
      ],
    },
    {
      label: 'Evento',
      icon: 'pi pi-calendar',
      items: [
        {
          label: 'Terna director general',
          icon: 'pi pi-fw pi-building',
          routerLink: '/admin/terna-director-general',
        },
        {
          label: 'Gestionar cuadrantes',
          icon: 'pi pi-fw pi-slack',
          routerLink: '/admin/asientos',
        },
        {
          label: 'Candidatos',
          icon: 'pi pi-fw pi-users',
          routerLink: '/admin/candidatos',
        },
        {
          label: 'Invitaciones',
          icon: 'pi pi-fw pi-ticket',
          routerLink: '/admin/invitaciones',
        },
        {
          label: 'Resultados votaciones',
          icon: 'pi pi-fw pi-chart-bar',
          routerLink: '/admin/votaciones',
        },
      ],
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.clearCache();
        this.authService.logout().subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });
        // No need to handle the response
      },
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
}
