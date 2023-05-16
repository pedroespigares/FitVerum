import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, OnDestroy{
  messages: any[] = [];
  writtenMessage: string = '';
  loading: boolean = true;

  constructor(private database: DatabaseService, public auth: AuthService) {}

  ngOnInit(): void {
    this.database.getForumMessages().subscribe((messages: any[]) => {
      this.messages = messages;
      this.loading = false;
    });
  }

  onSubmit(): void {
    if(this.auth.isAdmin){
      this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), true, false, null, null);
      this.writtenMessage = '';
    } else{
      this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), false, this.auth.isTrainer, null, this.auth.userID);
      this.writtenMessage = '';
    }

  }

  onKeyDown(event: any) {
    if (event.key === "Enter" && this.writtenMessage != '') {
      if(this.auth.isAdmin){
        this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), true, false, null, null);
        this.writtenMessage = '';
      } else{
        this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), false, this.auth.isTrainer, null, this.auth.userID);
        this.writtenMessage = '';
      }

    }
  }

  ngOnDestroy(): void {
    this.messages = [];
  }
}
