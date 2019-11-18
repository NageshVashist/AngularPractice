import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/Operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthReponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private logoutTimer: any;
    constructor(private httpClient: HttpClient, private router: Router) { }
    signUp(email: string, password: string) {
        const signupLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdXroIat9bEJTcqurQSSWf89y4CPmAMHM';
        return this.httpClient.post<AuthReponseData>(signupLink,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        const loginLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdXroIat9bEJTcqurQSSWf89y4CPmAMHM';

        return this.httpClient.post<AuthReponseData>(loginLink, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        }));
    }
    private handleAuthentication(email: string, id: string, token: string, expiresiIn: string) {
        const expiration = new Date(new Date().getTime() + +expiresiIn * 1000);
        const user = new User(email, id, token, expiration);
        this.user.next(user);
        this.autoLogout(+expiration * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationData: string
        } = JSON.parse(localStorage.getItem('userData'));

        const loadedUser = new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationData));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const duration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
            this.autoLogout(duration);
        }
    }
    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }
        this.logoutTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.logoutTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);

    }

    private handleError(errorRes: HttpErrorResponse) {

        let errorMsg = 'An unknown error occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'This E-main already exists';
                break;
            case 'EMAIL_NOT_FOUND': {

                errorMsg = 'This E-main does not exists';
                break;
            }
            case 'INVALID_PASSWORD': {

                errorMsg = 'Password not valid'
                break;
            }
            case 'USER_DISABLED': {

                errorMsg = 'User is dissabled'
                break;
            }

        }
        return throwError(errorMsg);

    }
}