import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  series: number;
  repetitions: number;
  weight: number;

  color: string = "#aeafe3";
  comments: string;

  constructor(private database: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.database.getByID(this.exerciseID, "exercises").then((exercise) => {
      this.exercise = exercise;

      this.database.getMachinePhoto(this.exercise.machineID).then((photoURL) => {
        this.photoURL = photoURL;
        this.loading = false;
      });
    });
  }

  saveEntry(): void{}
}
