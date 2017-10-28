import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'film-list',
    templateUrl: './film-list.component.html',
    styleUrls: ['./film-list.component.css'] 
})
export class FilmsComponent {
    public films: Film[];

    constructor(
        private router: Router,
        http: Http,
        @Inject('BASE_URL') baseUrl: string) {
        console.log(baseUrl + 'api/films');
        http.get(baseUrl + 'api/films').subscribe(result => { //urlapi da definire
            this.films = result.json() as Film[];
        }, error => console.error(error));
    }

    gotoDetail(id: string): void {
        console.log(id);
        this.router.navigate(['/film-details', id]);
    }
}


interface FilmMin { //Gestisce le informazioni da mostrare nella lista dei film visti
    id: number;
    title: string;
}

interface Film { //Per la gestione dei dettagli di un film
    _id: string;
    NomeFilm: string;
    Descrizione: string;
    Durata: number;
    Regista: string;
    Categoria: string;
    Anno: number;
    Copertina: any;
}