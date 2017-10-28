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
import { RegisterComponent} from './components/register/register.component';
import { AuthenticationService } from './components/_services/authentication.service';
import { AlertService } from './components/_services/alert.service';



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FilmsComponent,
        MyFilmsComponent,
        FilmDetailsComponent,
        
        RegisterComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'film-list', component: FilmsComponent },
            { path: 'myfilms', component: MyFilmsComponent },
            { path: 'film-details/:id', component: FilmDetailsComponent },
            { path: 'register', component: RegisterComponent},
            { path: '**', redirectTo: 'home' }
			
        ])
    ],
    providers: [AlertService,AuthenticationService]
    
})
export class AppModuleShared {
}
