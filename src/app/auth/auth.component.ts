import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthReponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    constructor(private authService: AuthService, private router: Router, private componentFactorResolver: ComponentFactoryResolver) { }
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    authObservable: Observable<AuthReponseData>
    closeSub: Subscription;
    @ViewChild(PlaceHolderDirective, { static: true }) alertHost: PlaceHolderDirective;
    switchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onClose() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        const alertCompFactory = this.componentFactorResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContailnerRef;
        hostViewContainerRef.clear();
        const alertComponentRef = hostViewContainerRef.createComponent(alertCompFactory);
        alertComponentRef.instance.message = message;
        this.closeSub = alertComponentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });

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
            this.showErrorAlert(this.error);
            this.isLoading = false;
        });
    }
    ngOnDestroy() {
        if (this.closeSub) {

            this.closeSub.unsubscribe();
        }
    }
}