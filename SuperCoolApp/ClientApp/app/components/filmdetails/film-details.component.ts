import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import {  ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';

import 'rxjs/add/operator/switchMap';

import { FilmDetailsService } from './film-details.service';
import { Film } from './film';

@Component({
    selector: 'film-details',
    templateUrl: './film-details.component.html',
    styleUrls: ['./film-details.component.css']
})

export class FilmDetailsComponent  {
    film: Film;
    id: number;
    private sub: any;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private filmDetailsService: FilmDetailsService,
        private http: Http, @Inject('BASE_URL') public baseUrl: string
    ) { 
        //this.route.params.subscribe(params => {
        //    this.id = +params['id']; 
        //});
        //console.log(this.id);
        http.get(baseUrl + 'api/film?IDFilm=1').subscribe(result => { //urlapi da definire
            this.film = result.json() as Film;
        }, error => console.error(error));

    }

    //ngOnInit(): void {
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
   

    goBack(): void {
        this.location.back();
    }
}

//interface Film { //Per la gestione dei dettagli di un film
//    filmID: number;
//    nomeFilm: string;
//    genere: string;
//    regista: string;
//    descrizione: string;
//    durata: number;
//    anno: number;
//    visti: any;
//}