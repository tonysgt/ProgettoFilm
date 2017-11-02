import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { RegistrationService } from '../_services/registration.service';


@Component({
    selector: 'film-list',
    templateUrl: './film-list.component.html',
    styleUrls: ['./film-list.component.css'],
})
export class FilmsComponent {
    public films: Film[];
    isadded = false;
    filterargs: string[]; 
    showadd = false;

    constructor(
        private router: Router,
        private regService: RegistrationService,
        
        http: Http,
        @Inject('BASE_URL') baseUrl: string) {
        console.log(baseUrl + 'api/films');
        var currentUser = window.sessionStorage.getItem('currentUser');
        if (currentUser != null) {
            this.showadd = true;
        }
        else
        {
            this.showadd = false;
        }


        http.get(baseUrl + 'api/films').subscribe(result => { //urlapi da definire
            this.films = result.json() as Film[];
        }, error => console.error(error));
       
       
    }

    gotoDetail(id: string): void {
        this.router.navigate(['/film-details', id]);
    }

    addToMyFilms(id: string): void {
        var currentUser = window.sessionStorage.getItem('currentUser');
        if (currentUser != null) {
            var user = JSON.parse(currentUser) as User;
            if (user.filmVisti.find(x => x == id) === undefined) {
                user.filmVisti.push(id);
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                this.regService.update(user)
                    .subscribe(
                    data => {
                        this.router.navigate(['/myfilms']);
                    },
                    error => {
                    });
            }
            else
            {
                this.isadded = true;
            }
        }
    }
}




class Film { //Per la gestione dei dettagli di un film
    _id: string;
    NomeFilm: string;
    Descrizione: string;
    Durata: number;
    Regista: string;
    Categoria: string;
    Anno: number;
    Copertina: any;
}