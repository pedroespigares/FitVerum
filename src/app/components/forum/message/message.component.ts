import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  userData: any = null;
  loading: boolean = true;

  constructor(private database: DatabaseService, private auth: AuthService) {}

  ngOnInit(): void {
    if(this.message.isTrainer){
      this.database.getTrainerData(this.message.userID).then((userData) => {
        this.userData = userData;
        this.loading = false;
      });
    } else if(!this.message.isAdmin && !this.message.isTrainer){
      this.database.getUserData(this.message.userID).then((userData) => {
        this.userData = userData;
        this.loading = false;
      });
    }
  }
}
