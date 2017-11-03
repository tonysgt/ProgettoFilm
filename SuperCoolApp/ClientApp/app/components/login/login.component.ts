import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    error = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
       ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                //ritorna alla route da cui è stato reindirizzato
                this.router.navigate([this.returnUrl]);
                
            },
            error => {
                
                console.log(error);
                this.loading = false;
                this.error = true;
            });
    }
}


