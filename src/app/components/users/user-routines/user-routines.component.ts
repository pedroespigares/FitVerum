import { Component,OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-routines',
  templateUrl: './user-routines.component.html',
  styleUrls: ['./user-routines.component.scss']
})
export class UserRoutinesComponent implements OnInit, OnDestroy {
  routines: any[] = [];
  trainer: string;

  id: string = this.auth.userID
  constructor(private database: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    // this.database.getUserTrainer(this.user).then((data) => {
    //   this.trainer = data;
    //   console.log(this.trainer);
    // });
    this.database.getRoutines(this.auth.userID).subscribe((data) => {
      this.routines = data;
    });
  }

  ngOnDestroy() {
    this.routines = [];
  }
}
