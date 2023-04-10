import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, TemplateRef, onInit } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, } from 'angular-calendar';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trainer-calendar',
  templateUrl: './trainer-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./trainer-calendar.component.scss'],
})
export class TrainerCalendarComponent implements onInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  constructor(
    private router: Router,
    private database: DatabaseService,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  events$: Observable<CalendarEvent<{ trainerID: string }>[]>;

  clickedDate: Date;

  calendarTitle: string;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  excludeDays: number[] = [0, 7];

  daysInWeek: number = 7;

  modalData: {
    event: any;
  };

  private destroy$ = new Subject<void>();
  refresh = new Subject<void>();

  ngOnInit() {
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });


      let trainerID = this.activatedRoute.snapshot.paramMap.get('id');
      this.fetchAppointments(trainerID);
  }

  // Evento que maneja tanto el cambio por drag and drop como el cambio de flecha por reescalado
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
    if(typeof newStart === 'number'){
      this.database.updateAppointmentDates(event.id.toString(), newStart, newEnd.getTime());
    } else{
      this.database.updateAppointmentDates(event.id.toString(), newStart.getTime(), newEnd.getTime());
    }
  }
  
  routeToAppointments(date: Date) {
    let timestamp = date.getTime();
    this.router.navigateByUrl(
      `/trainer/calendar/${this.activatedRoute.snapshot.paramMap.get('id')}/${timestamp}`
    );
  }

  fetchAppointments(trainerID: string){
    this.events$ = this.database.getAppointmentsOfTrainer(trainerID);
  }

  open(event: any) {
		this.modalData = { event };
    this.modalService.open(this.modalContent, { size: 'lg', centered: true, keyboard: true});
	}

  deleteEvent(eventID: string){
    let confirm = window.confirm('Are you sure you want to delete this appointment?');
    if(confirm){
      this.database.deleteAppointment(eventID);
      this.modalService.dismissAll();
    } else{
      return;
    }
  }
}
