import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-routine-exercises-simple',
  templateUrl: './user-routine-exercises-simple.component.html',
  styleUrls: ['./user-routine-exercises-simple.component.scss']
})
export class UserRoutineExercisesSimpleComponent {
  exercises = [];
  routineID: string = this.route.snapshot.paramMap.get('routineID');
  routineName: string;

  loadingRoutines: boolean = true;
  loadingTitle: boolean = true;

  constructor(private route: ActivatedRoute, private database: DatabaseService) { }

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
