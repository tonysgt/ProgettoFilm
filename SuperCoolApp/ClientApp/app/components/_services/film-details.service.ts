import { Inject } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Film } from '../_models/film';


export class FilmDetailsService{

    constructor(private http: Http, @Inject('BASE_URL') public baseUrl: string) { }

    getFilmDetails(id: number): Promise<Film> {
        const url = `${this.baseUrl}/api/film?IDFilm=${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Film)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error(error); 
        return Promise.reject(error.message || error);
    }
}