import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserCalendarComponent } from './components/user-calendar/user-calendar.component';
import { UserRoutinesComponent } from './components/user-routines/user-routines.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'user-calendar/:id', component: UserCalendarComponent},
  { path: 'user-calendar/:id/:date', component: UserRoutinesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
