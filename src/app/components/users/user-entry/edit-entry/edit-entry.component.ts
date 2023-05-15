import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  entryID: string = this.route.snapshot.paramMap.get('id');
  data: any = null;
  exerciseID: string;
  photoURL: string;


  machineID: string;
  loading: boolean = true;

  exercise: any;

  series: number = null;
  repetitions: number = null;
  weight: number = null;
  date: number = null;

  dateObject: Date = new Date(this.date);
  dateFormatted: string = `${this.dateObject.getFullYear()}-${this.dateObject.getMonth() + 1}-${this.dateObject.getDate()}`


  color: string = null;
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
    private toasts: ToastsService) { }

  ngOnInit(): void {
    console.log(this.entryID);
    this.database.getByID(this.entryID, "userEntry").then((userEntry) => {
      this.data = userEntry;
      this.series = this.data.series;
      this.repetitions = this.data.repetitions;
      this.weight = this.data.kg;
      this.date = this.data.start;
      this.color = this.data.color.primary;
      this.comments = this.data.comment;
      this.exerciseID = this.data.exerciseID;

      this.database.getByID(this.exerciseID, "exercises").then((exercise) => {
        this.exercise = exercise;

        this.database.getMachinePhoto(this.exercise.machineID).then((photoURL) => {
        this.photoURL = photoURL;

        this.database.getRoutineByExercise(this.data.exerciseID).then((routineID) => {
          this.routineID = routineID;

          this.database.getRoutineTitle(routineID).then((title) => {
            this.routineName = title;
            this.loading = false;
            });
          });
        });
      });
    });
  }

  updateEntry(): void{
    if(this.series != null || this.repetitions != null || this.weight != null){
      this.database.updateUserEntry(this.entryID, this.auth.userID, this.data.start, this.weight, this.repetitions, this.series, this.color, this.exercise.title, this.exerciseID, this.comments);
      this.toasts.entryUpdated = true;
      this.router.navigate(["/user/calendar"]);
    }
  }

  openCanvas(content:any){
      this.offcanvasService.open(content, { ariaLabelledBy: 'description' })
  }

  openEvolution(eventID: any) {
    this.router.navigateByUrl(`/user/evolution/${eventID}`);
  }
}
