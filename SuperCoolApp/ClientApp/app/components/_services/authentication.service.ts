import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    url: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, @Inject('BASE_URL')public baseUrl: string) { }

    login(email: string, password: string) {
        this.url = this.baseUrl + 'api/user/LogIn'; //post
        return this.http.post(this.url, JSON.stringify({ email: email, password: password }),{headers: this.headers })
            .map((response: Response) => {
                let user = response.json();
                window.sessionStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        if (typeof window.sessionStorage !== "undefined") {
            window.sessionStorage.removeItem('currentUser');
        }
        return true;
    }
}