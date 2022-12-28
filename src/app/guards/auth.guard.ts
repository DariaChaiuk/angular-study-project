import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { map, Observable, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router
    ) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(data => data.user),
            map(user => {
                const isAutheticated = !!user
                if (isAutheticated) {
                    return true;
                } else {
                    return this.router.createUrlTree(['login']);
                }
            })
        )
    }

}