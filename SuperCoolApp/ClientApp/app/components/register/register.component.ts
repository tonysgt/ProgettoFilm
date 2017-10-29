import { Component } from '@angular/core';
import { Router } from '@angular/router';

//import { AlertService, UserService } from '../_services/index';
import { RegistrationService } from '../_services/registration.service';

@Component({
    selector: "register",
    templateUrl: 'register.component.html',
    providers: [RegistrationService]
})

export class RegisterComponent { 
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private registrationService: RegistrationService) { }

    register() {
        this.loading = true;
        this.registrationService.create(this.model)
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
        }
    }

