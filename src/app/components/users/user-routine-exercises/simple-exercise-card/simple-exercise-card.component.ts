import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-simple-exercise-card',
  templateUrl: './simple-exercise-card.component.html',
  styleUrls: ['./simple-exercise-card.component.scss']
})
export class SimpleExerciseCardComponent implements OnInit{

  @Input() exercise: any;
  @Input() goToEntry: boolean;

  machineID: string;
  loading: boolean = true;

  constructor(private database: DatabaseService, private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.machineID = this.exercise.machineID;
    this.database.getMachinePhoto(this.machineID).then((photoURL) => {
      this.exercise.photoURL = photoURL;
      this.loading = false;
    });
  }

  goToUserEntry() {
    if(!this.goToEntry){
      this.router.navigateByUrl(`user/exercises/${this.machineID}`);
    };
    let date = this.route.snapshot.paramMap.get('date');
    this.router.navigateByUrl(`user/calendar/${date}/entry/${this.exercise.id}`);
  }
}
