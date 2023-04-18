import { Component,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { getStorage } from '@angular/fire/storage';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})

export class MachinesComponent implements OnInit {
  machines: any[];
  storage: any;
  loading: boolean = true;

  showAddToast: boolean = this.toasts.machineAdded;
  showDeleteToast: boolean = false;

  constructor(private database: DatabaseService, private toasts: ToastsService) {
    this.storage = getStorage();
  }

  ngOnInit(): void {
    this.database.getMachines().subscribe((machines: any) => {
      this.machines = machines;
      this.loading = false;
    });
  }

  handleDeleteMachine(): void{
    this.showDeleteToast = true;
  }
}
