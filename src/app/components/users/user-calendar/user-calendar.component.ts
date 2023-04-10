import { Component, onInit } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements onInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  // Para que el calendario sepa que eventos mostrar que serian las rutinas de la base de datos,
  // se puede hacer un subscribe al observable de rutinas y hacerle un map para que devuelva un array de CalendarEvent
  // Ejemplo:
  // ngOnInit() {
  //   this.rutinasService.getRutinas().subscribe(rutinas => {
  //     this.events = rutinas.map(rutina => {
  //       return {
  //         title: rutina.nombre,
  //         start: rutina.fechaInicio,
  //         end: rutina.fechaFin,
  //         color: {
  //            primary: '#ad2121',
  //            secondary: '#FAE3E3'
  //        },
  //       }
  //     })
  //   })
  // }


  events: CalendarEvent[] = [];

  clickedDate: Date;

  calendarTitle: string;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  routeToRoutines(date: Date){
    this.router.navigateByUrl(`/user/calendar/${this.activatedRoute.snapshot.paramMap.get('id')}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  }
}
