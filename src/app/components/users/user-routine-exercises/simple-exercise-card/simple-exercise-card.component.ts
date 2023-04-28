import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simple-exercise-card',
  templateUrl: './simple-exercise-card.component.html',
  styleUrls: ['./simple-exercise-card.component.scss']
})
export class SimpleExerciseCardComponent implements OnInit{

  @Input() exercise: any;

  machineID: string;
  loading: boolean = true;

  constructor(private database: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.machineID = this.exercise.machineID;
    this.database.getMachinePhoto(this.machineID).then((photoURL) => {
      this.exercise.photoURL = photoURL;
      this.loading = false;
    });
  }

  goToUserEntry() {
    let date = this.route.snapshot.paramMap.get('date');
    this.router.navigateByUrl(`user/calendar/${date}/entry/${this.exercise.id}`);
  }
}