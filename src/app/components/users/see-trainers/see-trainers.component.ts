import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-see-trainers',
  templateUrl: './see-trainers.component.html',
  styleUrls: ['./see-trainers.component.scss']
})
export class SeeTrainersComponent implements OnInit, OnDestroy{
  trainers: any[] = [];
  loading: boolean = true;
  trainerIDOfActualUser: string;

  constructor(private database: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    this.database.getUserTrainer(this.auth.userID).then((trainerID) => {
      this.trainerIDOfActualUser = trainerID;
      this.database.getTrainers().subscribe((data) => {
        this.trainers = data;
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.trainers = [];
  }
}
