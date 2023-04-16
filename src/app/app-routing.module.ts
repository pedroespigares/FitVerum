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
import { ShowExercisesComponent } from './components/trainers/trainer-routines/show-exercises/show-exercises.component';
import { EditRoutineComponent } from './components/trainers/trainer-routines/edit-routine/edit-routine.component';
import { AddRoutineComponent } from './components/trainers/trainer-routines/add-routine/add-routine.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { TrainerGuard } from './services/guards/trainer.guard';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'user/calendar', component: UserCalendarComponent, canActivate: [AuthGuard]},
  { path: 'user/calendar/:date', component: UserRoutinesComponent, canActivate: [AuthGuard]},
  { path: 'user/modification', component: UserModificationComponent, canActivate: [AuthGuard]},
  { path: 'administration/users', component: UsersComponent, canActivate: [AdminGuard]},
  { path: 'administration/machines', component: MachinesComponent, canActivate: [AdminGuard]},
  { path: 'administration/machines/add', component: AddMachineComponent, canActivate: [AdminGuard]},
  { path: 'administration/machines/edit/:id', component: UpdateMachineComponent, canActivate: [AdminGuard]},
  { path: 'administration/machines/show/:id', component: ShowMachineComponent, canActivate: [AdminGuard]},
  { path: 'trainer/clients', component: TrainerUsersComponent, canActivate: [TrainerGuard]},
  { path: 'trainer/calendar', component: TrainerCalendarComponent, canActivate: [TrainerGuard]},
  { path: 'trainer/calendar/:date', component: TrainerAppointmentComponent, canActivate: [TrainerGuard]},
  { path: 'trainer/modification', component: TrainerModificationComponent, canActivate: [TrainerGuard]},
  { path: 'trainer/routines', component: TrainerRoutinesComponent, canActivate: [TrainerGuard]},
  { path: 'trainer/routines/show/:id', component: ShowExercisesComponent, canActivate: [TrainerGuard]},
  { path: 'trainer/routines/edit/:id', component: EditRoutineComponent, canActivate: [TrainerGuard]},
  { path: 'trainer/routines/add/:userID', component: AddRoutineComponent, canActivate: [TrainerGuard]},
  { path: 'error/404-not-found', component: NotFoundComponent},
  { path: 'error/403-forbidden', component: ForbiddenComponent},
  { path: '**', redirectTo: '/error/404-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
