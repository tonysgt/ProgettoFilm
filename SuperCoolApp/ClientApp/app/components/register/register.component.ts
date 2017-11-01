import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { RegistrationService } from '../_services/registration.service';

@Component({
    selector: "register",
    templateUrl: 'register.component.html',
    providers: [RegistrationService]
})

export class RegisterComponent { 
    model: any = {};
    loading = false;
    error = false;
    constructor(
        private router: Router,
        private registrationService: RegistrationService) { }

    register() {
        this.loading = true;
        this.registrationService.create(this.model)
            .subscribe(
                data => {
                   
                    this.router.navigate(['/login']);
                },
                error => {
                    this.error = true;
                    this.loading = false;
                });
        }
    }

