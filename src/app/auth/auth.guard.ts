import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { map, take } from "rxjs/Operators";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private route: Router) { }
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1),map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            else {
                return this.route.createUrlTree(['/auth']);
            }
        }));
    }
}