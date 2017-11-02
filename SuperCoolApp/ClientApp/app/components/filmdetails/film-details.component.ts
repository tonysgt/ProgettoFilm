import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router, ParamMap } from '@angular/router';
import { Http } from '@angular/http';



import { RegistrationService } from '../_services/registration.service';

import { User } from '../_models/user';
import { Film } from '../_models/film';

@Component({
    selector: 'film-details',
    templateUrl: './film-details.component.html',
    styleUrls: ['./film-details.component.css']
})

export class FilmDetailsComponent  {
    film: Film;
    id: string;
    url: string;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private regService: RegistrationService,
        private http: Http, @Inject('BASE_URL') public baseUrl: string) { 
            this.route.params.subscribe(params => {
                this.id = params['id'];
                this.url = this.baseUrl + 'api/film?IDFilm=' + this.id;
                
                this.http.get(this.url).subscribe(result => { //urlapi da definire
                this.film = result.json() as Film;
                    }, error => console.error(error));
        });

    }

   
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    goBack(): void {
        this.location.back();
    }

    addFilm(id: string) {
        var currentUser = window.localStorage.getItem('currentUser');
        console.log(currentUser);
        if (currentUser != null) {
            var user = JSON.parse(currentUser) as User;
            console.log(user.filmVisti);
            if (user.filmVisti.find(x => x == id) === undefined) {
                user.filmVisti.push(id);
                console.log(user.filmVisti);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.regService.update(user)
                    .subscribe(
                    data => {

                        this.router.navigate(['/myfilms']);
                    },
                    error => {

                    });
            }
            else {
               
                console.log("elemento già presente");
            }
        }
    }
    
}

