import { Pipe, PipeTransform } from '@angular/core';

import { MyFilmsService } from '../_services/myfilms.service';
@Pipe({ name: 'noUserFilms' })
export class NoUserFilmsPipe implements PipeTransform {
    constructor(
        private myfilmsservice: MyFilmsService
    ){}
    transform(array: string[], filterFrom: string[] ): string[] {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return array.filter(item => !this.myfilmsservice.getFilmID().some(f => f == item));
    }
    }
