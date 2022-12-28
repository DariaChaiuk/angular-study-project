import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { AuthActions } from '../pages/auth-page/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private tokenExpirationTimer: any;

    constructor (
        private store: Store<fromApp.AppState>
    ) { }

    logout() {
        this.store.dispatch(AuthActions.logout());
        this.clearTokenExpirationTimer();
    }

    setLogoutTimer(expirationIn: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(AuthActions.logout());
        }, expirationIn * 1000);
    }

    clearTokenExpirationTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}