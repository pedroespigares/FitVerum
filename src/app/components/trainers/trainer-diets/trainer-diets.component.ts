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
  /**
   * Array de clientes
   */
  clients: any[] = [];

  /**
   * Array de dietas
   */
  diets: any[] = [];

  /**
   * Paginación
   */
  page = 1;
  pageSize = 5;

  /**
   * Cliente seleccionado
   */
  selectedClient: any = null;

  loadingDiets = true;

  /**
   * Mostrar toast
   */
  showAddToast: boolean = this.toasts.routineAdded;
  showDeleteToast: boolean = false;

  constructor(private database: DatabaseService, private toasts: ToastsService, private auth: AuthService) { }

  trainerID = this.auth.userID

  /**
   * Obtener los clientes del entrenador
   */
  ngOnInit() {
    this.database.getTrainerClients(this.trainerID).subscribe((data) => {
      this.clients = data;
    });
  }

  /**
   * Seleccionar cliente y obtener sus dietas
   * @param client
   */
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

  /**
   * Desseleccionar cliente
   */
  deselectClient() {
    this.selectedClient = null;
    this.diets = [];
  }

/**
 * Obtener las dietas de un cliente
 * @param client
 */
  getDiets(client: any) {
    this.database.getDiets(client.id).subscribe((data) => {
      this.diets = data;
      this.loadingDiets = false;
    });
  }
}
