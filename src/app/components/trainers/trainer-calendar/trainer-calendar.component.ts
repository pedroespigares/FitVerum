import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-calendar',
  templateUrl: './trainer-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./trainer-calendar.component.scss'],
})
export class TrainerCalendarComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  constructor(
    private router: Router,
    private database: DatabaseService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private auth: AuthService
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

  modalDataStart: Date;
  modalDataEnd: Date;

  private destroy$ = new Subject<void>();
  refresh = new Subject<void>();

  trainerID: string = this.auth.userID

  /**
   * Configuración del calendario
   */
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

      this.fetchAppointments(this.trainerID);
  }

  /**
   * Método que detecta el cambio de de los eventos en el calendario
   */
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

  /**
   * Llevar al usuario a la vista de sus rutinas con la fecha seleccionada
   * @param date Fecha seleccionada
   */
  routeToAppointments(date: Date) {
    let timestamp = date.getTime();
    this.router.navigateByUrl(
      `/trainer/calendar/${timestamp}`
    );
  }

  /**
   * Traer las citas del entrenador y meterlas en un array de eventos para el calendario
   * @param trainerID ID del entrenador
   */
  fetchAppointments(trainerID: string){
    this.events$ = this.database.getAppointmentsOfTrainer(trainerID);
  }

  /**
   * Abrir modal para eliminar evento
   * @param event - Evento del calendario
   */
  open(event: any) {
		this.modalData = { event };
    this.modalDataStart = new Date(event.start);
    this.modalDataEnd = new Date(event.end);
    this.modalService.open(this.modalContent, { size: 'lg', centered: true, keyboard: true});
	}

  /**
   * Eliminar evento
   * @param eventID - ID del evento
   */
  deleteEvent(eventID: string){
    this.database.delete('trainerEntry', eventID);
    this.modalService.dismissAll();
  }
}
