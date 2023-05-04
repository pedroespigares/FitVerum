import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-evolution',
  templateUrl: './user-evolution.component.html',
  styleUrls: ['./user-evolution.component.scss']
})
export class UserEvolutionComponent implements OnInit{

  constructor(private route: ActivatedRoute, private database: DatabaseService, private auth: AuthService) { }

  data: any;

  ngOnInit(): void {
    this.database.getDataFromUserEntry(this.auth.userID, this.route.snapshot.paramMap.get('exerciseID')).then((data) => {
      console.log(data);
    });
  }
}
