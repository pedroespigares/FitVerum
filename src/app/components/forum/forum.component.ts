import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, OnDestroy{
  messages: any[] = [];

  constructor(private database: DatabaseService) {}
  ngOnInit(): void {
    this.database.getForumMessages().subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }
  ngOnDestroy(): void {
    this.messages = [];
  }
}
