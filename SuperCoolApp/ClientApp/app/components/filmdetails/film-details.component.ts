import { Component } from '@angular/core';

@Component({
    selector: 'film-details',
    templateUrl: './film-details.component.html',
    styleUrls: ['./film-details.component.css']
})

export class FilmDetailsComponent{

}

interface Film { //Per la gestione dei dettagli di un film
    filmID: number;
    nomeFilm: string;
    genere: string;
    regista: string;
    descrizione: string;
    durata: number;
    anno: number;
    visti: any;
}