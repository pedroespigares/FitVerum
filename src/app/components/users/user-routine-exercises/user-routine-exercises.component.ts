import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-routine-exercises',
  templateUrl: './user-routine-exercises.component.html',
  styleUrls: ['./user-routine-exercises.component.scss']
})
export class UserRoutineExercisesComponent implements OnInit {

  exercises = [];
  routineID: string = this.route.snapshot.paramMap.get('routineID');
  routineName: string;

  loadingRoutines: boolean = true;
  loadingTitle: boolean = true;

  date: any = this.route.snapshot.paramMap.get('date');

  constructor(private route: ActivatedRoute, private database: DatabaseService, public auth: AuthService) { }

  ngOnInit() {
    this.database.getExercisesByRoutine(this.routineID).subscribe((data) => {
      this.exercises = data;
      this.loadingRoutines = false;
    });

    this.database.getRoutineTitle(this.routineID).then((data) => {
      this.routineName = data;
      this.loadingTitle = false;
    });
  }
}
