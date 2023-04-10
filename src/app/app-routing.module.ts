import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserCalendarComponent } from './components/users/user-calendar/user-calendar.component';
import { UserRoutinesComponent } from './components/users/user-routines/user-routines.component';
import { UsersComponent } from './components/administration/users/users.component';
import { TrainerUsersComponent } from './components/trainers/trainer-users/trainer-users.component';
import { MachinesComponent } from './components/administration/machines/machines.component';
import { AddMachineComponent } from './components/administration/machines/add-machine/add-machine.component';
import { UpdateMachineComponent } from './components/administration/machines/update-machine/update-machine.component';
import { ShowMachineComponent } from './components/administration/machines/show-machine/show-machine.component';
import { TrainerCalendarComponent } from './components/trainers/trainer-calendar/trainer-calendar.component';
import { TrainerAppointmentComponent } from './components/trainers/trainer-appointment/trainer-appointment.component';
import { UserModificationComponent } from './components/users/user-modification/user-modification.component';
import { TrainerModificationComponent } from './components/trainers/trainer-modification/trainer-modification.component';
import { TrainerRoutinesComponent } from './components/trainers/trainer-routines/trainer-routines.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'user/calendar/:id', component: UserCalendarComponent},
  { path: 'user/calendar/:id/:date', component: UserRoutinesComponent},
  { path: 'user/modification/:id', component: UserModificationComponent},
  { path: 'administration/users', component: UsersComponent},
  { path: 'administration/machines', component: MachinesComponent},
  { path: 'administration/machines/add', component: AddMachineComponent},
  { path: 'trainer/clients/:id', component: TrainerUsersComponent},
  { path: 'trainer/calendar/:id', component: TrainerCalendarComponent},
  { path: 'trainer/calendar/:id/:date', component: TrainerAppointmentComponent},
  { path: 'trainer/modification/:id', component: TrainerModificationComponent},
  { path: 'trainer/routines/:id', component: TrainerRoutinesComponent},
  { path: 'administration/machines/edit/:id', component: UpdateMachineComponent},
  { path: 'administration/machines/show/:id', component: ShowMachineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
