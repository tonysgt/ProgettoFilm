import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'myfilms',
    templateUrl: './myfilms.component.html',
    styleUrls: ['./myfilms.component.css']
})
export class MyFilmsComponent {
    public filmpreviews: FilmPreview[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/myfilms').subscribe(result => { //api da definire
            this.filmpreviews = result.json() as FilmPreview[];
        }, error => console.error(error));
    }
}

interface FilmPreview {
    id: number;
    name: string;
}
