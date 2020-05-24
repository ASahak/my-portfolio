import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@app/shared/services/auth.service';
import {Router} from '@angular/router';
import {Common} from '@corePath/enums';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor (
        private authService: AuthService,
        public router: Router
    ) {}
    canActivate (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return new Promise((resolve) => {
            this.authService.isLoggedIn().subscribe(res => {
                this.router.navigateByUrl(Common.homePath);
                resolve(true);
            }, err => {
                resolve(true);
            });
        });
    }

}
