import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-show-exercises',
  templateUrl: './show-exercises.component.html',
  styleUrls: ['./show-exercises.component.scss']
})
export class ShowExercisesComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private database: DatabaseService) { }

  routineID: string = this.activatedRoute.snapshot.paramMap.get('id');

  routineName: string;

  exercises: [] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.database.getExercisesByRoutine(this.routineID).subscribe((data: any) => {
        this.exercises = data;
        this.loading = false;
        this.database.getRoutineTitle(this.routineID).then((name) =>{
          this.routineName = name;
        })
      });
  }

}
