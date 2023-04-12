import { Component,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private database: DatabaseService, private activatedRoute: ActivatedRoute, private auth: AuthService) {}

  ngOnInit() {
    let trainerID = this.activatedRoute.snapshot.paramMap.get('id');

    this.database.getUsersWithoutTrainer().subscribe((data) => {
      this.users = data;
      this.usersWithoutTrainerLoading = false;
    });

    this.database.getTrainerClients(trainerID).subscribe((data) => {
      this.clients = data;
      this.clientsLoading = false;
    });
  }

  subscribeClient(clientID: string) {
    this.database.subscribeClient(clientID, this.auth.userID);
  }

  unsubscribeClient(clientID: string) {
    this.database.unsubscribeClient(clientID);
  }
}
