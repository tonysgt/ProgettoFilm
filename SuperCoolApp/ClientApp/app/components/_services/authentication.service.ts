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
        //this.url = this.baseUrl + 'api/user/LogIn?email='+email+'&password='+password; //get

        console.log(this.url);
        return this.http.post(this.url, JSON.stringify({ email: email, password: password }),{headers: this.headers })
        //return this.http.get(this.url)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();

                console.log(user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}