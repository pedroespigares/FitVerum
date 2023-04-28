import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  exerciseID: string = this.route.snapshot.paramMap.get('exerciseID');
  exercise: any;
  date: Date = new Date(this.route.snapshot.paramMap.get('date'));
  dateNotFormatted = this.route.snapshot.paramMap.get('date');
  photoURL: string;

  loading: boolean = true;

  series: number = null;
  repetitions: number = null;
  weight: number = null;

  color: string = "#6a69dc";
  comments: string = null;

  routineID: string;
  routineName: string;

  modalData: {
    event: any;
  };

  constructor(
    private database: DatabaseService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.database.getByID(this.exerciseID, "exercises").then((exercise) => {
      this.exercise = exercise;

      this.database.getMachinePhoto(this.exercise.machineID).then((photoURL) => {
        this.photoURL = photoURL;

        this.database.getRoutineByExercise(this.exerciseID).then((routineID) => {
          this.routineID = routineID;
          this.database.getRoutineTitle(routineID).then((title) => {
            this.routineName = title;
            this.loading = false;
          });
        });
      });
    });
  }

  saveEntry(): void{
    if(this.series != null || this.repetitions != null || this.weight != null){
      this.database.createUserEntry(this.auth.userID, this.date.getTime(), this.weight, this.repetitions, this.series, this.color, this.exercise.title, this.comments);
      this.router.navigate(["/user/calendar"]);
    }
  }

  openCanvas(content:any){
      this.offcanvasService.open(content, { ariaLabelledBy: 'description' })
  }

  openModal() {
		this.modalData = { event: this.exercise};
    this.modalService.open(this.modalContent, { size: 'lg', centered: true, keyboard: true});
	}
}
