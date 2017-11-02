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
    check = false;
    showadd = false;
   

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private regService: RegistrationService,
        private http: Http, @Inject('BASE_URL') public baseUrl: string) { 


            var currentUser = window.localStorage.getItem('currentUser');
            if (currentUser != null) {
                this.showadd = true;
            }
            else {
                this.showadd = false;
            }
            this.route.params.subscribe(params => {
                this.id = params['id'];
                this.url = this.baseUrl + 'api/film?IDFilm=' + this.id;
                this.checkState(this.id);
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


    checkState(id: string) {
        var currentUser = window.localStorage.getItem('currentUser');
        if (currentUser != null) {
            var user = JSON.parse(currentUser) as User;
            if (user.filmVisti.find(x => x == id) === undefined) {
                this.check = false;
            }
            else
            {
                this.check = true;
            }
        }

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
                        this.check = true;
                    },
                    error => {

                    });
            }
        }
    }

    removeFilm(id: string): void {
        var currentUser = window.localStorage.getItem('currentUser');
        console.log(currentUser);
        if (currentUser !== null) {
            var user = JSON.parse(currentUser) as User;
            console.log(user.filmVisti);

            var index = user.filmVisti.indexOf(id);
            user.filmVisti.splice(index, 1);
            console.log(user.filmVisti);
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            this.regService.update(user);
            this.check = false;
        }
    }
    
}

