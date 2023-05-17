import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-trainers',
  templateUrl: './see-trainers.component.html',
  styleUrls: ['./see-trainers.component.scss']
})
export class SeeTrainersComponent implements OnInit, OnDestroy{
  trainers: any[] = [];
  loading: boolean = true;

  constructor(private database: DatabaseService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.database.getTrainers().subscribe((data) => {
      this.trainers = data;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.trainers = [];
  }
}
