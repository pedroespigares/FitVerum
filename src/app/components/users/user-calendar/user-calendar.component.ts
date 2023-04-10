import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

  }


  events: CalendarEvent[] = [];

  clickedDate: Date;

  calendarTitle: string;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  routeToRoutines(date: Date){
    this.router.navigateByUrl(`/user/calendar/${this.activatedRoute.snapshot.paramMap.get('id')}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  }
}
