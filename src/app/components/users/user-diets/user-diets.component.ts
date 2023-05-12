import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-diets',
  templateUrl: './user-diets.component.html',
  styleUrls: ['./user-diets.component.scss']
})
export class UserDietsComponent implements OnInit, OnDestroy {
  diets: any[] = [];
  trainer: string;
  loading: boolean = true;

  id: string = this.auth.userID
  constructor(private database: DatabaseService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.database.getDiets(this.auth.userID).subscribe((data) => {
      this.diets = data;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.diets = [];
  }

  goToDiet(diet: any) {
    this.router.navigateByUrl(`user/diets/${diet.id}`);
  }
}
