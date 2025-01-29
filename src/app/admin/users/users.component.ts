import { Component } from '@angular/core';
import { User } from '../../helpers/models/user/user';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Dialog } from 'primeng/dialog';
import { UserService } from '../../helpers/services/user/user.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  imports: [TableModule, ButtonModule, Toolbar, Dialog, UserFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: User[] = [];
  selectedUser: User = {} as User;
  showFormDialog: boolean = false;
  isLoading: boolean = false;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.showFormDialog = false
    this.isLoading = true;
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.isLoading = false;
    });
  }

 showDialog() {
     this.selectedUser = {} as User;
     this.showFormDialog = true;
   }
 
   showDialogToEdit(user: User) {
     this.selectedUser = {...user};
     this.showFormDialog = true;
   }

  delete(userId: string) {}
}
