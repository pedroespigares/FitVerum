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

  /**
   * ID de la rutina
   */
  routineID: string = this.activatedRoute.snapshot.paramMap.get('id');

  /**
   * Nombre de la rutina
   */
  routineName: string;

  /**
   * Ejercicios de la rutina
   */
  exercises: [] = [];

  loading: boolean = true;

  /**
   * Obtener los ejercicios de la rutina y el nombre de la rutina
   */
  ngOnInit(): void {
    this.database.getExercisesByRoutine(this.routineID).subscribe((data: any) => {
        this.exercises = data;
    });

    this.database.getRoutineTitle(this.routineID).then((name) =>{
      this.routineName = name;
      this.loading = false;
    })
  }

}
