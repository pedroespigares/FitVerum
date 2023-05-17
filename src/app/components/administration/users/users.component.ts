import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: any[] = [];
  trainers: any[] = [];
  page = 1;
  pageSize = 4;

  page_2 = 1;
  pageSize_2 = 4;

  usersLoading = true;
  trainersLoading = true;

  constructor(private database: DatabaseService) {}

  ngOnInit() {
    this.database.getUsers().subscribe((data) => {
      this.users = data;
      this.usersLoading = false;
    });

    this.database.getTrainers().subscribe((data) => {
      this.trainers = data;
      this.trainersLoading = false;
    });

  }

  convertUserToTrainer(id: string) {
    this.database.convertUserToTrainer(id);
  }

  convertTrainerToUser(id: string) {
    this.database.convertTrainerToUser(id);
  }

  // La idea de los delete también era que el usuario se eliminara también de la autenticación de firebase,
  // pero firebase solo permite eliminar una cuenta si es el propio usuario el que lo hace.

  deleteUser(id: string) {
    let confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      this.database.delete('users', id);
      this.database.deleteUserData(id, false);
    } else {
      return;
    }
  }

  deleteTrainer(id: string) {
    let confirm = window.confirm(
      'Are you sure you want to delete this trainer?'
    );
    if (confirm) {
      this.database.delete('trainers', id);
      this.database.deleteUserData(id, true);
    } else {
      return;
    }
  }
}
