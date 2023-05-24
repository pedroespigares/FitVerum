import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss']
})
export class AddExerciceComponent implements OnInit{

  title: string = '';
  description: string = '';
  machineID: string = '';
  loading: boolean = true;
  routineName: string;
  routineLoaded: boolean = false;

  machines: any= [];

  constructor(
    private database: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  routineID: string = this.activatedRoute.snapshot.paramMap.get('routineID');

  ngOnInit(): void {
    this.database.getMachines().subscribe((machines: any) => {
      this.machines = machines;
      this.loading = false;
    });

    this.database.getRoutineTitle(this.routineID).then((title: string) => {
      this.routineLoaded = true;
      this.routineName = title;
    });
  }

  addExercise(){
    this.database.addExercise(this.title, this.description, this.machineID, this.routineID);
    this.router.navigate(['/trainer/routines/show/' + this.routineID]);
  }
}
