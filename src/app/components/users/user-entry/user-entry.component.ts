import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent implements OnInit{

  exerciseID: string = this.route.snapshot.paramMap.get('exerciseID');
  exercise: any;
  date: Date = new Date(this.route.snapshot.paramMap.get('date'));
  photoURL: string;

  loading: boolean = true;

  series: number = null;
  repetitions: number = null;
  weight: number = null;

  color: string = "#FF9595";
  comments: string = null;


  constructor(private database: DatabaseService, private router: Router, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.database.getByID(this.exerciseID, "exercises").then((exercise) => {
      this.exercise = exercise;

      this.database.getMachinePhoto(this.exercise.machineID).then((photoURL) => {
        this.photoURL = photoURL;
        this.loading = false;
      });
    });
  }

  saveEntry(): void{
    if(this.series != null || this.repetitions != null || this.weight != null){
      this.database.createUserEntry(this.auth.userID, this.date.getTime(), this.weight, this.repetitions, this.series, this.color, this.exercise.title, this.comments);
      this.router.navigate(["/user/calendar"]);
    }
  }
}
