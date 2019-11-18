import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthReponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(private authService: AuthService,private router:Router) { }
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    authObservable: Observable<AuthReponseData>
    switchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm) {
        this.error = null;
        if (!form.valid) {
            return;
        }
        this.isLoading = true;
        if (this.isLoginMode) {
            this.authObservable = this.authService.login(form.value.email, form.value.pass);
        }
        else {
            this.authObservable = this.authService.signUp(form.value.email, form.value.pass);
        }

        this.authObservable.subscribe(res => {
            console.log(res);
            form.reset();
            this.isLoading = false;
            this.router.navigate(["/recipe"]);
        }, errorMsg => {
            console.log(errorMsg);
            this.error = errorMsg;
            this.isLoading = false;
        });
    }

}