import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-routines',
  templateUrl: './user-routines.component.html',
  styleUrls: ['./user-routines.component.scss']
})
export class UserRoutinesComponent {
  routines: any[];
  user: string;
  trainer: string;

  constructor(private database: DatabaseService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.router.snapshot.paramMap.get('id');
    // this.database.getUserTrainer(this.user).then((data) => {
    //   this.trainer = data;
    //   console.log(this.trainer);
    // });
    this.database.getRoutines(this.user).subscribe((data) => {
      this.routines = data;
    });
  }

  ngOnDestroy() {
    this.routines = [];
  }
}
