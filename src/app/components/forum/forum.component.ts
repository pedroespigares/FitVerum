import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, OnDestroy{
  /**
   * Array de mensajes del foro
   */
  messages: any[] = [];

  /**
   * Mensaje escrito por el usuario
   */
  writtenMessage: string = '';

  loading: boolean = true;

  constructor(private database: DatabaseService, public auth: AuthService) {}

  /**
   * Obtener los mensajes del foro
   */
  ngOnInit(): void {
    this.database.getForumMessages().subscribe((messages: any[]) => {
      this.messages = messages;
      this.loading = false;
    });
  }

  /**
   * Enviar un mensaje al foro
   */
  onSubmit(): void {
    if(this.auth.isAdmin){
      this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), true, false, null);
      this.writtenMessage = '';
    } else{
      this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), false, this.auth.isTrainer, this.auth.userID);
      this.writtenMessage = '';
    }

  }

  /**
   * Enviar un mensaje al foro al pulsar enter
   * @param event
   */
  onKeyDown(event: any) {
    if (event.key === "Enter" && this.writtenMessage != '' && event.shiftKey === false) {
      if(this.auth.isAdmin){
        this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), true, false, null);
        this.writtenMessage = '';
      } else{
        this.database.uploadForumMessage(this.writtenMessage, new Date().getTime(), false, this.auth.isTrainer, this.auth.userID);
        this.writtenMessage = '';
      }
    }
  }

  /**
   * Método para vaciar el array de mensajes
   */
  ngOnDestroy(): void {
    this.messages = [];
  }
}
