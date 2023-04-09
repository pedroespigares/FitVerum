import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-modification',
  templateUrl: './trainer-modification.component.html',
  styleUrls: ['./trainer-modification.component.scss']
})
export class TrainerModificationComponent {
  trainer: any;
  loading = true;
  membership: Date;

  constructor(private database: DatabaseService, private activatedRoute: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.database.getTrainerData(id).then((data) => {
      this.trainer = data;
      this.loading = false;
      this.membership = new Date(this.trainer.timestamp);
    });
  }
}
