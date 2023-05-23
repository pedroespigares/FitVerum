import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { getStorage } from '@angular/fire/storage';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})

export class MachinesComponent implements OnInit, OnDestroy {
  /**
   * Array de máquinas
   */
  machines: any[];

  /**
   * Servicio de storage de Firebase
   */
  storage: any;
  loading: boolean = true;

  /**
   * Variable para mostrar el toast de añadir máquina
   */
  showAddToast: boolean = this.toasts.machineAdded;
  showDeleteToast: boolean = false;

  constructor(private database: DatabaseService, private toasts: ToastsService) {
    this.storage = getStorage();
  }

  /**
   * Obtener las máquinas de la base de datos
   */
  ngOnInit(): void {
    this.database.getMachines().subscribe((machines: any) => {
      this.machines = machines;
      this.loading = false;
    });
  }

  /**
   * Método para mostrar el toast de eliminar máquina
   */
  handleDeleteMachine(): void{
    this.showDeleteToast = true;
  }

  /**
   * Método para ocultar el toast de añadir máquina
   */
  ngOnDestroy(): void {
    this.toasts.machineAdded = false;
  }
}
