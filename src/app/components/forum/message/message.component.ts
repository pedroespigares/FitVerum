import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() message: any;
  userData: any = null;
  loading: boolean = true;

  constructor(private database: DatabaseService, public auth: AuthService) {}

  ngOnInit(): void {
    if(this.message.isAdmin){
      this.userData = {
        displayName: 'Admin',
        isAdmin: true,
      }
      this.loading = false;
    } else if(this.message.isTrainer){
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

  deleteMessage(id: string){
    let confirmDelete = confirm('Are you sure you want to delete this message?');
    if(confirmDelete){
      this.database.deleteForumMessage(id);
    }
  }

  ngOnDestroy(): void {
    this.userData = null;
    this.message = [];
  }
}
