import { Component,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-users',
  templateUrl: './trainer-users.component.html',
  styleUrls: ['./trainer-users.component.scss']
})
export class TrainerUsersComponent implements OnInit {
  users: any[] = [];
  clients: any[] = [];
  page = 1;
  pageSize = 4;

  page_2 = 1;
  pageSize_2 = 4;

  usersWithoutTrainerLoading = true;
  clientsLoading = true;

  trainerID: string = this.auth.userID;

  constructor(private database: DatabaseService, private auth: AuthService) {}

  ngOnInit() {

    this.database.getUsersWithoutTrainer().subscribe((data) => {
      this.users = data;
      this.usersWithoutTrainerLoading = false;
    });

    this.database.getTrainerClients(this.trainerID).subscribe((data) => {
      this.clients = data;
      this.clientsLoading = false;
    });
  }

  /**
   * Convertir un usuario en cliente
   * @param userID
   */
  subscribeClient(userID: string) {
    this.database.subscribeClient(userID, this.trainerID);
  }

  /**
   * Quitar usuario de la lista de clientes
   * @param clientID
   */
  unsubscribeClient(clientID: string) {
    this.database.unsubscribeClient(clientID);
    this.database.deleteRoutinesWithUserID(clientID, false);
  }
}
