import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FilmsComponent } from './components/filmlist/film-list.component';
import { MyFilmsComponent } from './components/myfilms/myfilms.component';
import { FilmDetailsComponent } from './components/filmdetails/film-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './components/_guard/auth.guard';

import { AuthenticationService } from './components/_services/authentication.service';
import { RegistrationService } from './components/_services/registration.service';

import { MyFilterPipe } from './components/filmlist/film-list.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LoginComponent,
        FilmsComponent,
        MyFilmsComponent,
        FilmDetailsComponent,
        RegisterComponent,
        MyFilterPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
            { path: 'login', component: LoginComponent },
            { path: 'film-list', component: FilmsComponent },
            { path: 'myfilms', component: MyFilmsComponent, canActivate: [AuthGuard] },
            { path: 'film-details/:id', component: FilmDetailsComponent },
            { path: 'register', component: RegisterComponent},
            { path: '**', redirectTo: 'home' }
			
        ])
    ],
    providers: [AuthGuard, AuthenticationService, RegistrationService]
    
})
export class AppModuleShared {
}
