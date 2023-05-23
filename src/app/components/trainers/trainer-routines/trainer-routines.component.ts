import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-trainer-routines',
  templateUrl: './trainer-routines.component.html',
  styleUrls: ['./trainer-routines.component.scss']
})
export class TrainerRoutinesComponent implements OnInit, OnDestroy {

  /**
   * Array de clientes
   */
  clients: any[] = [];

  /**
   * Array de rutinas
   */
  routines: any[] = [];

  /**
   * Paginación
   */
  page = 1;
  pageSize = 5;

  /**
   * Cliente seleccionado
   */
  selectedClient: any = null;

  loadingRoutines = true;

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
   * Seleccionar cliente y obtener sus rutinas
   * @param client
   */
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

  /**
   * Deseleccionar cliente
   */
  deselectClient() {
    this.selectedClient = null;
    this.routines = [];
  }

  /**
   * Mostrar toast de rutina borrada
   */
  handleDeleteRoutine(): void{
    this.showDeleteToast = true;
  }

  /**
   * Obtener las rutinas del cliente
   * @param client
   */
  getRoutines(client: any) {
    this.database.getRoutines(client.id).subscribe((data) => {
      this.routines = data;
      this.loadingRoutines = false;
    });
  }

  /**
   * Eliminar toast de rutina añadida
   */
  ngOnDestroy(): void {
    this.toasts.routineAdded = false;
  }
}
