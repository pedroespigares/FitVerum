import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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


  constructor(private database: DatabaseService, private activatedRoute: ActivatedRoute, private router: Router) { }

  trainerID = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit() {
    this.database.getTrainerClients(this.trainerID).subscribe((data) => {
      this.clients = data;
    });
  }

  selectClient(client: any) {
    this.selectedClient = client;
    this.getRoutines(client);
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
