
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    user: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        var currentUser = window.localStorage.getItem('currentUser');
        if (currentUser != null) {
            this.user = JSON.parse(currentUser) as User;
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}


