import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-trainer-routines',
  templateUrl: './trainer-routines.component.html',
  styleUrls: ['./trainer-routines.component.scss']
})
export class TrainerRoutinesComponent implements OnInit {

  clients: any[] = [];
  routines: any[] = [];
  page = 1;
  pageSize = 5;
  selectedClient: any = null;

  loadingRoutines = true;

  showAddToast: boolean = this.toasts.routineAdded;
  showDeleteToast: boolean = false;

  constructor(private database: DatabaseService, private toasts: ToastsService, private auth: AuthService) { }

  trainerID = this.auth.userID

  ngOnInit() {
    this.database.getTrainerClients(this.trainerID).subscribe((data) => {
      this.clients = data;
    });
  }

  selectClient(client: any) {
    if(this.selectedClient == null){
      this.selectedClient = client;
      this.getRoutines(client);
    } else{
      this.deselectClient();
      this.selectedClient = client;
      this.getRoutines(client);
    }
  }

  deselectClient() {
    this.selectedClient = null;
    this.routines = [];
  }


  getRoutines(client: any) {
    this.database.getClientRoutines(client.id).subscribe((data) => {
      this.routines = data;
      this.loadingRoutines = false;
    });
  }
}
