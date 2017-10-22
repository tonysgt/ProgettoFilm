import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'filmlist',
    templateUrl: './filmlist.component.html',
    styleUrls: ['./filmlist.component.css'] 
})
export class FilmsComponent {
    public films: FilmMin[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/films').subscribe(result => { //urlapi da definire
            this.films = result.json() as FilmMin[];
        }, error => console.error(error));
    }
}


interface FilmMin { //Gestisce le informazioni da mostrare nella lista dei film visti
    id: number;
    title: string;
}

interface Film { //Per la gestione dei dettagli di un film
    id: number;
    title: string;
    runtime: number;
    year: number;
    genre: string;
    director: string;
    description: string;
}
