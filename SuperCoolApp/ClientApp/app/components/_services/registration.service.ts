import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/user';

@Injectable()
export class RegistrationService {
    constructor(private http: Http) { }

    create(user: User) {
        return this.http.put('/api/user', user).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.post('/api/user', user).map((response: Response) => response.json());
    }
}