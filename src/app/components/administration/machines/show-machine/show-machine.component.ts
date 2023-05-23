import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-machine',
  templateUrl: './show-machine.component.html',
  styleUrls: ['./show-machine.component.scss']
})
export class ShowMachineComponent implements OnInit {
  /**
   * Máquina a mostrar
   */
  machine: any;

  /**
   * Variable para mostrar el spinner de carga
   */
  loading = true;

  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) { }

  /**
   * Obtener la máquina a mostrar
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getByID(id, "machines").then((machine) => {
      this.machine = machine;
      this.loading = false;
    });
  }

  /**
   * Volver a la lista de máquinas
   */
  backToMachines(): void {
    this.router.navigate(['/administration/machines']);
  }
}
