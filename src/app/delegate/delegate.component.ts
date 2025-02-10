import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../helpers/services/system/auth.service';
import { switchMap } from 'rxjs';
import { DelegateService } from '../helpers/services/delegate/delegate.service';
import { Delegate } from '../helpers/models/delegate/delegate';

@Component({
  selector: 'app-delegate',
  imports: [RouterOutlet, RouterModule, Menubar],
  templateUrl: './delegate.component.html',
  styleUrl: './delegate.component.scss',
})
export class DelegateComponent {
  items: MenuItem[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly delegateService: DelegateService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService
      .getUserDetails()
      .pipe(
        switchMap((userDetails) => {
          return this.delegateService.getByCi(userDetails.ci);
        })
      )
      .subscribe((delegateInfo) => {
        this.generateMenu(delegateInfo);
      });
  }

  generateMenu(delegate: Delegate) {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: 'inicio',
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
        },
      },
    ];
  }
}
