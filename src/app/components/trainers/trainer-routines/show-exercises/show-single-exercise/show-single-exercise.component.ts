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
  isUser: boolean = this.route.snapshot.paramMap.get('isUser') == 'user' ? true : false;
  constructor(private route: ActivatedRoute, private database: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.database.getByID(id, "exercises").then((exercise) => {
      this.exercise = exercise;
      this.routineID = this.exercise.routineID;
        this.database.getMachinePhoto(this.exercise.machineID).then((photo) => {
          this.photo = photo;
          this.loading = false;

      });
    });
  }

  backToExercises(): void {
    if(this.isUser){
      this.router.navigate([`/user/routines/${this.routineID}`]);
    } else{
      this.router.navigate([`/trainer/routines/show/${this.routineID}`]);
    }
  }
}
