import { Component } from '@angular/core';
import { AuthService } from '../../helpers/services/system/auth.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-home',
  imports: [ButtonModule,TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe((user) => {
 
    });
  }
}
