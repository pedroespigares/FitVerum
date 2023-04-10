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
  machine: any;
  loading = true;
  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getMachineByID(id).then((machine) => {
      this.machine = machine;
      this.loading = false;
    });
  }

  backToMachines(): void {
    this.router.navigate(['/administration/machines']);
  }
}
