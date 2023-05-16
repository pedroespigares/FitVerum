import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-single-exercise',
  templateUrl: './show-single-exercise.component.html',
  styleUrls: ['./show-single-exercise.component.scss']
})
export class ShowSingleExerciseComponent implements OnInit{
  exercise: any;
  loading = true;
  routineID: string;
  photo: string;
  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getByID(id, "exercises").then((exercise) => {
      this.exercise = exercise;
      this.database.getRoutineByExercise(id).then((routine) => {
        this.routineID = routine.id;
        this.database.getMachinePhoto(this.exercise.machineID).then((photo) => {
          this.photo = photo;
          this.loading = false;
        });
      });
    });
  }

  backToExercises(): void {
    this.router.navigate([`/trainer/routines/show/${this.routineID}`]);
  }
}
