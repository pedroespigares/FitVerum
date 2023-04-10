import { Component,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { getStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})

export class MachinesComponent implements OnInit {
  machines: any[];
  storage: any;
  loading: boolean = true;

  constructor(private database: DatabaseService) {
    this.storage = getStorage();
  }

  ngOnInit(): void {
    this.database.getMachines().subscribe((machines: any) => {
      this.machines = machines;
      this.loading = false;
    });
  }
}
