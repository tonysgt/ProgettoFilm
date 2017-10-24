import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'myfilms',
    templateUrl: './myfilms.component.html',
    styleUrls: ['./myfilms.component.css']
})
export class MyFilmsComponent {
    public filmpreviews: FilmPreview[];
   

    constructor(
        private router: Router,
        http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/myfilms').subscribe(result => { //api da definire
            this.filmpreviews = result.json() as FilmPreview[];
        }, error => console.error(error));
    }
    //gotoDetail(): void {
    //    this.router.navigate(['/film-details']);
    //}
    gotoDetail(id: number): void {
        this.router.navigate(['/film-details', id]);
    }
 
}

interface FilmPreview {
    id: number;
    name: string;
}
