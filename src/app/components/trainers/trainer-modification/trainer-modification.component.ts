import { Component,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-modification',
  templateUrl: './trainer-modification.component.html',
  styleUrls: ['./trainer-modification.component.scss']
})
export class TrainerModificationComponent implements OnInit {
  trainer: any;
  loading = true;
  membership: Date;

  constructor(private database: DatabaseService, private auth: AuthService) {}

  id: string = this.auth.userID

  ngOnInit(): void {
    this.database.getTrainerData(this.id).then((data) => {
      this.trainer = data;
      this.loading = false;
      this.membership = new Date(this.trainer.timestamp);
    });
  }
}
