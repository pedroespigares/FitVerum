import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserCalendarComponent } from './components/users/user-calendar/user-calendar.component';
import { UserRoutinesComponent } from './components/users/user-routines/user-routines.component';
import { UsersComponent } from './components/administration/users/users.component';
import { MachinesComponent } from './components/administration/machines/machines.component';
import { TrainerUsersComponent } from './components/trainers/trainer-users/trainer-users.component';
import { AddMachineComponent } from './components/administration/machines/add-machine/add-machine.component';
import { UpdateMachineComponent } from './components/administration/machines/update-machine/update-machine.component';
import { ShowMachineComponent } from './components/administration/machines/show-machine/show-machine.component';
import { TrainerCalendarComponent } from './components/trainers/trainer-calendar/trainer-calendar.component';
import { TrainerAppointmentComponent } from './components/trainers/trainer-appointment/trainer-appointment.component';
import { UserModificationComponent } from './components/users/user-modification/user-modification.component';
import { TrainerModificationComponent } from './components/trainers/trainer-modification/trainer-modification.component';
import { MachineCardComponent } from './components/administration/machines/machine-card/machine-card.component';
import { TrainerRoutinesComponent } from './components/trainers/trainer-routines/trainer-routines.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { TrainerRoutineCardComponent } from './components/trainers/trainer-routines/trainer-routine-card/trainer-routine-card.component';
import { EditRoutineComponent } from './components/trainers/trainer-routines/edit-routine/edit-routine.component';
import { ShowExercisesComponent } from './components/trainers/trainer-routines/show-exercises/show-exercises.component';
import { ExerciseCardComponent } from './components/trainers/trainer-routines/show-exercises/exercise-card/exercise-card.component';
import { NgChartsModule } from 'ng2-charts';
import { AddRoutineComponent } from './components/trainers/trainer-routines/add-routine/add-routine.component';
import { AddExerciceComponent } from './components/trainers/trainer-routines/show-exercises/add-exercice/add-exercice.component';
import { UserEntryComponent } from './components/users/user-entry/user-entry.component';
import { UserRoutineExercisesComponent } from './components/users/user-routine-exercises/user-routine-exercises.component';
import { SimpleExerciseCardComponent } from './components/users/user-routine-exercises/simple-exercise-card/simple-exercise-card.component';
import { AboutUsComponent } from './components/static/about-us/about-us.component';
import { UserRoutinesSimpleComponent } from './components/users/simple/user-routines-simple/user-routines-simple.component';
import { UserRoutineExercisesSimpleComponent } from './components/users/simple/user-routine-exercises-simple/user-routine-exercises-simple.component';
import { TrainerDietsComponent } from './components/trainers/trainer-diets/trainer-diets.component';
import { TrainerDietCardComponent } from './components/trainers/trainer-diets/trainer-diet-card/trainer-diet-card.component';
import { UserDietsComponent } from './components/users/user-diets/user-diets.component';
import { UserEvolutionComponent } from './components/users/user-evolution/user-evolution.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { AddDietComponent } from './components/trainers/trainer-diets/add-diet/add-diet.component';
import { EditDietComponent } from './components/trainers/trainer-diets/edit-diet/edit-diet.component';
import { EditExerciseComponent } from './components/trainers/trainer-routines/show-exercises/edit-exercise/edit-exercise.component';
import { ShowSingleExerciseComponent } from './components/trainers/trainer-routines/show-exercises/show-single-exercise/show-single-exercise.component';
import { ForumComponent } from './components/forum/forum.component';
import { MessageComponent } from './components/forum/message/message.component';
import { ShowDietComponent } from './components/trainers/trainer-diets/show-diet/show-diet.component';
import { EditEntryComponent } from './components/users/user-entry/edit-entry/edit-entry.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    UserCalendarComponent,
    UserRoutinesComponent,
    UsersComponent,
    MachinesComponent,
    TrainerUsersComponent,
    AddMachineComponent,
    UpdateMachineComponent,
    ShowMachineComponent,
    TrainerCalendarComponent,
    TrainerAppointmentComponent,
    UserModificationComponent,
    TrainerModificationComponent,
    MachineCardComponent,
    TrainerRoutinesComponent,
    NotFoundComponent,
    ForbiddenComponent,
    TrainerRoutineCardComponent,
    EditRoutineComponent,
    ShowExercisesComponent,
    ExerciseCardComponent,
    AddRoutineComponent,
    AddExerciceComponent,
    UserEntryComponent,
    UserRoutineExercisesComponent,
    SimpleExerciseCardComponent,
    AboutUsComponent,
    UserRoutinesSimpleComponent,
    UserRoutineExercisesSimpleComponent,
    TrainerDietsComponent,
    TrainerDietCardComponent,
    UserDietsComponent,
    UserEvolutionComponent,
    AddDietComponent,
    EditDietComponent,
    EditExerciseComponent,
    ShowSingleExerciseComponent,
    ForumComponent,
    MessageComponent,
    ShowDietComponent,
    EditEntryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      }
    }),
    AppRoutingModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
