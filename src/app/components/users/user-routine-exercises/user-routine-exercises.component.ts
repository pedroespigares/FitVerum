import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-routine-exercises',
  templateUrl: './user-routine-exercises.component.html',
  styleUrls: ['./user-routine-exercises.component.scss']
})
export class UserRoutineExercisesComponent implements OnInit {

  exercises = [];
  routineID: string = this.route.snapshot.paramMap.get('routineID');
  routineName: string;

  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.getExercisesByRoutine(this.routineID).subscribe((data) => {
      this.exercises = data;
    });

    this.database.getRoutineTitle(this.routineID).then((data) => {
      this.routineName = data;
    });
  }
}
