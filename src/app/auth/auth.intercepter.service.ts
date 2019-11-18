import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpResponse, HttpHandler, HttpRequest, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/Operators";

@Injectable()
export class AuthIntercepterService implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authService.user.pipe(take(1), exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }
            else {

                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });

                return next.handle(modifiedReq);
            }
        }));




    }
}