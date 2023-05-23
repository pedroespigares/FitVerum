import { Component,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-appointment',
  templateUrl: './trainer-appointment.component.html',
  styleUrls: ['./trainer-appointment.component.scss']
})
export class TrainerAppointmentComponent implements OnInit {
  /**
   * Array de clientes del entrenador
   */
  clients: any[] = [];
  /**
   * Paginación
   */
  page = 1;
  pageSize = 5;

  /**
   * Cliente seleccionado
   */
  selectedClient: any = null;

  /**
   * Datos de configuración de la cita
   */
  date: Date = undefined;
  end_time: number = undefined;
  color: string = "#aeafe3";
  title: string = undefined;
  description: string = '';

  errorMessage: string = '';

  trainerID: string = this.auth.userID;
  constructor(private database: DatabaseService, private activatedRoute: ActivatedRoute, private router: Router, private auth: AuthService) {}

  /**
   * Obtener los clientes del entrenador
   */
  ngOnInit() {
    let date = this.activatedRoute.snapshot.paramMap.get('date');
    this.date = new Date(parseInt(date));

    this.database.getTrainerClients(this.trainerID).subscribe((data) => {
      this.clients = data;
    });
  }

  /**
   * Seleccionar cliente
   * @param client
   */
  selectClient(client: any) {
    if(this.selectedClient == null){
      this.selectedClient = client;
    } else{
      this.deselectClient();
      this.selectedClient = client;
    }
  }

  /**
   * Desseleccionar cliente
   */
  deselectClient() :void {
    this.selectedClient = null;
  }

  /**
   * Crear cita
   * Comprueba que la hora de finalización sea posterior a la de inicio y que la hora de finalización sea entre las 8:00 y las 22:00
   * Si se cumplen las condiciones, crea la cita
   * Si no, muestra un mensaje de error
   */
  createAppointment() :void {
    let to_date = new Date(`${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()} ${this.end_time}`);
    let from_date_timestamp = this.date.getTime();
    let to_date_timestamp = to_date.getTime();
    let parsedEndTime = parseInt(this.end_time.toString().split(':')[0]);
    let parsedEndTimeMinutes = parseInt(this.end_time.toString().split(':')[1]);

    if(to_date_timestamp < from_date_timestamp) {
      this.errorMessage = 'End time must be after start time';
      return;
    }

    if(parsedEndTime > 22 && parsedEndTimeMinutes >= 0 || parsedEndTime < 8) {
      this.errorMessage = 'End time must be between 8:00 and 22:00';
      return;
    }

    this.database.createAppointment(this.selectedClient.userID, this.selectedClient.trainerID, from_date_timestamp, to_date_timestamp, this.color, `${this.selectedClient.displayName} - ${this.title}`, this.description);
    this.selectedClient = null;
    this.router.navigateByUrl(`/trainer/calendar`);
  }
}
