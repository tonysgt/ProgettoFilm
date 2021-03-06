import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { RegistrationService } from '../_services/registration.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../_models/film';

@Component({
    selector: 'film-list',
    templateUrl: './film-list.component.html',
    styleUrls: ['./film-list.component.css'],
})
export class FilmsComponent {
    public films: Film[];
    filterargs: string[]; 
    showadd = false;
    display = 'none';

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

    //
    gotoDetail(id: string): void {
        this.router.navigate(['/film-details', id]);
    }

    //aggiunge il film nella lista dei miei film
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
                this.openModal();
            }
        }
    }

    openModal() {

        this.display = 'block';

    }

    onCloseHandled() {

        this.display = 'none';

    }
}


@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], criteria: string): any {

        if (!items || !criteria)
            return items;

        return items.filter(item => {
            for (let key in item) {
                if (("" + item[key]).toLowerCase().includes(criteria.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
    }
}