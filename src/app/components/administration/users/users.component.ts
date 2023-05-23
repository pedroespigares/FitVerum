import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  /**
   * Array de usuarios y entrenadores
   */
  users: any[] = [];
  trainers: any[] = [];

  /**
   * Variables para la paginación
   */
  page = 1;
  pageSize = 4;

  page_2 = 1;
  pageSize_2 = 4;

  /**
   * Variables para mostrar el spinner de carga
   */
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

  /**
   * Convierte un usuario en entrenador
   * @param id
   */
  convertUserToTrainer(id: string) {
    this.database.convertUserToTrainer(id);
  }

  /**
   * Conviernte un entrenador en usuario
   * @param id
   */
  convertTrainerToUser(id: string) {
    this.database.convertTrainerToUser(id);
  }

  // La idea de los delete también era que el usuario se eliminara también de la autenticación de firebase,
  // pero firebase solo permite eliminar una cuenta si es el propio usuario el que lo hace.

  // En este apartado no he usado el modal de confirmación ya que al tener varios botones de eliminar no he conseguido implementarlo.

  /**
   * Borra un usuario de la base de datos
   * @param id
   */
  deleteUser(id: string) {
    let confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      this.database.delete('users', id);
      this.database.deleteUserData(id, false);
    } else {
      return;
    }
  }

  /**
   * Borra un entrenador de la base de datos
   * @param id
   */
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
