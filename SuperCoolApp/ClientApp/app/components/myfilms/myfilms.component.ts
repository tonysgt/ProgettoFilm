import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { RegistrationService } from '../_services/registration.service';

import { Film } from '../_models/film';
import { User } from '../_models/user';

@Component({
    selector: 'myfilms',
    templateUrl: './myfilms.component.html',
    styleUrls: ['./myfilms.component.css']
})
export class MyFilmsComponent {
    public films: Film[] | undefined;
    user: User;
    filmvisti: string[]


    constructor(
        private router: Router,
        private regService: RegistrationService,
        private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.getFilms();
    }

    //richiama la pagina dei dettagli
    gotoDetail(id: number): void {
        this.router.navigate(['/film-details', id]);
    }


    //effettua la richiesta dei film visti da un utente
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
            this.http.get(this.baseUrl + 'api/films/many' + query).subscribe(result => { //api da definire
                this.films = result.json() as Film[];
            }, error => console.error(error));
        }
        else
        {
            this.films = undefined;
        }
        

    }

    
    //restituisce gli id dei film visti dall'utente
    getFilmID(): void {
        var currentUser = window.sessionStorage.getItem('currentUser');
        if (currentUser !== null)
        {
           this.user = JSON.parse(currentUser) as User;
           this.filmvisti = this.user.filmVisti;
        }
    }

    //rimuove un film dalla lista
    removeFromMyFilms(id: string): void {
        var currentUser = window.sessionStorage.getItem('currentUser');
        if (currentUser !== null) {
            var user = JSON.parse(currentUser) as User;
            var index = user.filmVisti.indexOf(id);
            user.filmVisti.splice(index, 1);
            window.sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.regService.update(user)
                .subscribe(
                data => {
                    this.getFilms();
                },
                error => {
                });
        }
    }
}




