import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-trainer-diets',
  templateUrl: './trainer-diets.component.html',
  styleUrls: ['./trainer-diets.component.scss']
})
export class TrainerDietsComponent {


  clients: any[] = [];
  diets: any[] = [];
  page = 1;
  pageSize = 5;
  selectedClient: any = null;

  loadingDiets = true;

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
      this.getDiets(client);
    } else{
      this.deselectClient();
      this.selectedClient = client;
      this.getDiets(client);
    }
  }

  deselectClient() {
    this.selectedClient = null;
    this.diets = [];
  }


  getDiets(client: any) {
    this.database.getDiets(client.id).subscribe((data) => {
      this.diets = data;
      this.loadingDiets = false;
    });
  }
}
