import { Component, Input, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() message: any;
  userData: any = null;
  loading: boolean = true;

  modalData: {
    message: any;
  };

  constructor(private database: DatabaseService, public auth: AuthService, private modalService: NgbModal) {}

  /**
   * Obtiene los datos del usuario que ha escrito el mensaje y dependiendo de su rol se le asigna unos datos u otros
   */
  ngOnInit(): void {
    if(this.message.isAdmin){
      this.userData = {
        displayName: 'Admin',
        isAdmin: true,
      }
      this.loading = false;
    } else if(this.message.isTrainer){
      this.database.getTrainerData(this.message.userID).then((userData) => {
        if(userData == null){
          this.userData = {
            displayName: 'Deleted User',
            isAdmin: false,
          }
          this.loading = false;
          return;
        }
        this.userData = userData;
        this.userData.isAdmin = false;
        this.loading = false;
      });
    } else if(!this.message.isAdmin && !this.message.isTrainer){
      this.database.getUserData(this.message.userID).then((userData) => {
        if(userData == null){
          this.userData = {
            displayName: 'Deleted User',
            isAdmin: false,
          }
          this.loading = false;
          return;
        }
        this.userData = userData;
        this.userData.isAdmin = false;
        this.loading = false;
      });
    }
  }

  deleteMessage(id: string){
    this.database.deleteForumMessage(id);
    this.modalService.dismissAll();
  }

  open(message: any) {
		this.modalData = { message };
    this.modalService.open(this.modalContent, { size: 'md', centered: true, keyboard: true});
	}

  ngOnDestroy(): void {
    this.userData = null;
    this.message = [];
  }
}
