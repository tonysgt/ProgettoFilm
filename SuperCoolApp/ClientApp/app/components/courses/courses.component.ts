import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html'
})
export class CoursesComponent {
    public courses: Course[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/courses').subscribe(result => {
            this.courses = result.json() as Course[];
        }, error => console.error(error));
    }
}

interface Course {
    name: string;
    hours: number;
}
