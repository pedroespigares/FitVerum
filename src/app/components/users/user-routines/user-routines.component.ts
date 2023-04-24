import { Component,OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-routines',
  templateUrl: './user-routines.component.html',
  styleUrls: ['./user-routines.component.scss']
})
export class UserRoutinesComponent implements OnInit, OnDestroy {
  routines: any[] = [];
  trainer: string;
  loading: boolean = true;

  id: string = this.auth.userID
  constructor(private database: DatabaseService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

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
    let date = this.route.snapshot.paramMap.get('date');
    this.router.navigateByUrl(`user/calendar/${date}/${routine.id}`);
  }
}
