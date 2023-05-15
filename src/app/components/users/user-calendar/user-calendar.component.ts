import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  modalData: {
    event: any;
  };

  modalDataDate: Date;

  showAddToast: boolean = this.toast.entryAdded;
  showDeleteToast: boolean = false;
  showUpdatedToast: boolean = this.toast.entryUpdated;

  constructor(private router: Router, private auth: AuthService, private database: DatabaseService, private modalService: NgbModal, private toast: ToastsService) {}

  ngOnInit() {
    this.fetchEntries();
  }


  events$: Observable<CalendarEvent<{ userID: string }>[]>;

  clickedDate: Date;

  calendarTitle: string;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  refresh = new Subject<void>();

  fetchEntries(): void{
    this.events$ = this.database.getUserEntries(this.auth.userID);
  }

  routeToRoutines(date: Date){
    this.router.navigateByUrl(`/user/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  }

  eventTimesChanged({
    event,
    newStart,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    this.refresh.next();
    if(typeof newStart === 'number'){
      this.database.updateUserEntryDate(event.id.toString(), newStart);
    } else{
      this.database.updateUserEntryDate(event.id.toString(), newStart.getTime());
    }
  }

  open(event: any) {
		this.modalData = { event };
    this.modalDataDate = new Date(event.start);
    this.modalService.open(this.modalContent, { size: 'lg', centered: true, keyboard: true, windowClass: 'custom-modal'});
	}

  openEvolution(eventID: any) {
    this.modalService.dismissAll();
    this.router.navigateByUrl(`/user/evolution/${eventID}`);
  }


  deleteEvent(id: string) {
    let confirm = window.confirm('Are you sure you want to delete this entry?');
    if(!confirm){ return; }
    this.database.delete('userEntry', id);
    this.modalService.dismissAll();
    this.refresh.next();
    this.showDeleteToast = true;
  }

  goToUpdate(id: string) {
    this.modalService.dismissAll();
    this.router.navigateByUrl(`/user/edit-entry/${id}`);
  }

  ngOnDestroy(): void {
    this.toast.entryAdded = false;
    this.showDeleteToast = false;
    this.toast.entryUpdated = false;
  }
}
