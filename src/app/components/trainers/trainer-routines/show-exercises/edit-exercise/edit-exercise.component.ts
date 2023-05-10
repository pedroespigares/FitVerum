import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  id: string = this.route.snapshot.paramMap.get('id');
  exercise: any;
  title: string;
  description: string;
  machineID: string;
  routineID: string;
  exerciseUploaded: boolean = false;
  photo: string;
  newPhotoURL: string = null;
  machines: any= [];

  loading: boolean = true;

  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.database.getByID(this.id, "exercises").then((exercise) => {
      this.exercise = exercise;
      this.exerciseUploaded = true;
      this.title = this.exercise.title;
      this.description = this.exercise.description;
      this.routineID = this.exercise.routineID;
      this.machineID = this.exercise.machineID;
      this.database.getMachinePhoto(this.exercise.machineID).then((photoURL) => {
        this.photo = photoURL;
        this.database.getMachines().subscribe((machines: any) => {
          this.machines = machines;
          this.loading = false;
        });
      });
    });
  }

  /**
   * Actualizar ejercicio
   */
  updateExercise(): void {
      this.database.updateExercise(this.id, this.title, this.description, this.machineID, this.routineID);
      this.router.navigate([`/trainer/routines/show/${this.routineID}`]);
    }
}
