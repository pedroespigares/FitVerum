import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ref, getStorage, deleteObject} from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-trainer-diet-card',
  templateUrl: './trainer-diet-card.component.html',
  styleUrls: ['./trainer-diet-card.component.scss']
})
export class TrainerDietCardComponent {
  storage: any;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  modalData: {
    diet: any;
  };
  @Input() diet: any;

  constructor(private database: DatabaseService, private modalService: NgbModal) {
    this.storage = getStorage();
  }

  /**
   * Borrar máquina de la base de datos
   * @param id
   * @param photoURL
   * @returns
   */
  deleteDiet(id: string, photoURL: string): void {
    this.database.delete('diets', id);
    this.deletePhotoFromStorage(photoURL);
    this.modalService.dismissAll();
  }

  /**
   * Borrar foto de la máquina de Firebase Storage
   * @param photoURL
   * @returns
   * */

  deletePhotoFromStorage(photoURL: string): void {
    const photoRef = ref(this.storage, photoURL);
    deleteObject(photoRef);
  }

  open(diet: any) {
		this.modalData = { diet };
    this.modalService.open(this.modalContent, { size: 'md', centered: true, keyboard: true});
	}
}
