import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import {  ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

//import { Film } from './film';

@Component({
    selector: 'film-details',
    templateUrl: './film-details.component.html',
    styleUrls: ['./film-details.component.css']
})

export class FilmDetailsComponent  {
    film: Film;
    id: number;
    url: string;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        
        private http: Http, @Inject('BASE_URL') public baseUrl: string) { 
            this.route.params.subscribe(params => {
                this.id = +params['id'];
                this.url = this.baseUrl + 'api/film?IDFilm='+this.id;
                this.http.get(this.url).subscribe(result => { //urlapi da definire
                this.film = result.json() as Film;
                    }, error => console.error(error));
        });

    }

    ngOnInit(): void {
       
            //this.http.get(this.baseurl + 'api/film?idfilm=${this.id}').subscribe(result => { //urlapi da definire
            //    this.film = result.json() as film;
            //}, error => console.error(error));

       
    }
    //    //this.route.paramMap
    //    //    .switchMap((params: ParamMap) => this.filmDetailsService.getFilmDetails(+params.get('id')))
    //    //    .subscribe(film => this.film = film);


    //    this.route.params.subscribe(params =>
    //        this.id = +params['id']);

    //    const url = `${this.baseUrl}/api/film?IDFilm=${this.id}`;
    //    this.http.get(url).subscribe(result => { //urlapi da definire
    //        this.film = result.json() as Film;
    //    }, error => console.error(error));
        
        
    //}
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    goBack(): void {
        this.location.back();
    }
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