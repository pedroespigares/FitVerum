'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="custom-logo" data-src="images/FitVerumLogo.png">
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2c58e6d519218d6078c1f3cb18debff7b820da06abd4ae88edc72200d2420603f8965c10e50715f7118b4a4cd7d23638f89e6eb632ebfba5ab2a9eacfaf75548"' : 'data-target="#xs-components-links-module-AppModule-2c58e6d519218d6078c1f3cb18debff7b820da06abd4ae88edc72200d2420603f8965c10e50715f7118b4a4cd7d23638f89e6eb632ebfba5ab2a9eacfaf75548"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2c58e6d519218d6078c1f3cb18debff7b820da06abd4ae88edc72200d2420603f8965c10e50715f7118b4a4cd7d23638f89e6eb632ebfba5ab2a9eacfaf75548"' :
                                            'id="xs-components-links-module-AppModule-2c58e6d519218d6078c1f3cb18debff7b820da06abd4ae88edc72200d2420603f8965c10e50715f7118b4a4cd7d23638f89e6eb632ebfba5ab2a9eacfaf75548"' }>
                                            <li class="link">
                                                <a href="components/AboutUsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutUsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddDietComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddDietComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddExerciceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddExerciceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddMachineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddMachineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddRoutineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddRoutineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditDietComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditDietComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditExerciseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditRoutineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditRoutineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExerciseCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExerciseCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FaqComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FaqComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForbiddenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForbiddenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForumComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LegalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LegalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MachineCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachineCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MachinesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachinesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeeTrainersCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeeTrainersCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeeTrainersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeeTrainersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowDietComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowDietComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowExercisesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowExercisesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowMachineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowMachineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowSingleExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowSingleExerciseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleExerciseCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimpleExerciseCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerAppointmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerAppointmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerDietCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerDietCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerDietsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerDietsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerModificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerModificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerRoutineCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerRoutineCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerRoutinesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerRoutinesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainerUsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainerUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateMachineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateMachineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDietsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDietsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEvolutionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEvolutionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserModificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserModificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRoutineExercisesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRoutineExercisesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRoutineExercisesSimpleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRoutineExercisesSimpleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRoutinesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRoutinesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRoutinesSimpleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRoutinesSimpleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotloggedGuard.html" data-type="entity-link" >NotloggedGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastsService.html" data-type="entity-link" >ToastsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrainerGuard.html" data-type="entity-link" >TrainerGuard</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});