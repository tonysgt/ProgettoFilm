
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    tellmesomething: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
        this.tellmesomething="supercalifragi"
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                this.router.navigate(['/myfilms']);
                this.tellmesomething = "bananaspritz";
            },
            error => {
                this.tellmesomething = "fragolaflambe";
                console.log(error);
                this.loading = false;
            });
    }
}


