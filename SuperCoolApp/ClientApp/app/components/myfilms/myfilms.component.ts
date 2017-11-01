import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { RegistrationService } from '../_services/registration.service';

import { User } from '../_models/user';

@Component({
    selector: 'myfilms',
    templateUrl: './myfilms.component.html',
    styleUrls: ['./myfilms.component.css']
})
export class MyFilmsComponent {
    public films: Film[];
    user: User;
    
    filmvisti: string[]


    constructor(
        private router: Router,
        private regService: RegistrationService,
        private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.getFilms();
    }

    getFilms(): void {
        this.getFilmID();
        var query = "?";
        if (this.filmvisti != null && this.filmvisti.length != 0) {
            for (var _i = 0; _i < this.filmvisti.length; _i++) { //JS for
                var filmvisto = this.filmvisti[_i];
                if ((_i + 1) == this.filmvisti.length) {
                    query += "IDFilms=" + filmvisto;
                }
                else {
                    query += "IDFilms=" + filmvisto + "&";
                }
            }
            console.log(this.baseUrl + 'api/films/many' + query);
            this.http.get(this.baseUrl + 'api/films/many' + query).subscribe(result => { //api da definire
                this.films = result.json() as Film[];
            }, error => console.error(error));
        }
    }

    gotoDetail(id: number): void {
        this.router.navigate(['/film-details', id]);
    }

    getFilmID(): void {
        var currentUser = window.localStorage.getItem('currentUser');
        console.log(currentUser);
        if (currentUser !== null)
        {
           this.user = JSON.parse(currentUser) as User;
           console.log(this.user.filmVisti);
           this.filmvisti = this.user.filmVisti;
        }
        

    }

    removeFromMyFilms(id: string): void {

        var currentUser = window.localStorage.getItem('currentUser');
        console.log(currentUser);
        if (currentUser !== null) {
            var user = JSON.parse(currentUser) as User;
            console.log(user.filmVisti);
           
            var index = user.filmVisti.indexOf(id);
            user.filmVisti.splice(index, 1);
            console.log(user.filmVisti);
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            this.regService.update(user)
                .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    this.getFilms();
                },
                error => {
                    //this.alertService.error(error);
                    //this.loading = false;
                });
        }
    }
}

interface Film {
    _id: string;
    NomeFilm: string;
    Descrizione: string;
    Durata: number;
    Regista: string;
    Categoria: string;
    Anno: number;
    Copertina: any;
}


