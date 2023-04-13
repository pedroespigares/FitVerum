import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {

  }


  events: CalendarEvent[] = [];

  clickedDate: Date;

  calendarTitle: string;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];



  routeToRoutines(date: Date){
    this.router.navigateByUrl(`/user/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  }
}
