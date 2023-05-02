import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-routines-simple',
  templateUrl: './user-routines-simple.component.html',
  styleUrls: ['./user-routines-simple.component.scss']
})
export class UserRoutinesSimpleComponent implements OnInit, OnDestroy{
  routines: any[] = [];
  trainer: string;
  loading: boolean = true;

  id: string = this.auth.userID
  constructor(private database: DatabaseService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.database.getRoutines(this.auth.userID).subscribe((data) => {
      this.routines = data;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.routines = [];
  }

  goToRoutineExercises(routine: any) {
    this.router.navigateByUrl(`user/routines/${routine.id}`);
  }
}
