import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';




import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import {  FilmsComponent } from './components/filmlist/filmlist.component';
import { CoursesComponent } from './components/courses/courses.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FilmsComponent,
		CoursesComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'filmlist', component: FilmsComponent },
			{ path: 'courses', component: CoursesComponent },
            { path: '**', redirectTo: 'home' }
			
        ])
    ]
})
export class AppModuleShared {
}
