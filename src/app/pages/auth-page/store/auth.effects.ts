import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, of, switchMap, tap, map, catchError } from 'rxjs';
import { AuthResponseData } from "src/app/models/auth-response-data";
import { UrlProvider } from "src/app/utils/url.provider";
import * as AuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "src/app/models/user";
import { AuthService } from '../../../services/auth.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

    handleAuthentication = (userData: AuthResponseData) => {
        const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);
        const user = new User(userData.email, userData.localId, userData.idToken, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        this.authService.setLogoutTimer(+userData.expiresIn);
        return AuthActions.AuthActions.login({ user })
    }

    authSignUp = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.AuthActionsApi.signupapi),
            switchMap((authData) => {
                return this.http.post<AuthResponseData>(`${UrlProvider.signUpUrl}?key=AIzaSyBZNVUaoZQWYm6XTvRnRKLzUVAJpV_1NLw`, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }).pipe(
                    map(userData => this.handleAuthentication(userData)),
                    catchError(err => of(AuthActions.AuthActionsApi.loginapifail({ authError: err.error.error.message })))
                )
            })
        )
    )

    authLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.AuthActionsApi.loginapi),
            switchMap((authData) => {
                return this.http.post<AuthResponseData>(`${UrlProvider.loginUrl}?key=AIzaSyBZNVUaoZQWYm6XTvRnRKLzUVAJpV_1NLw`, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }).pipe(
                    map(userData => this.handleAuthentication(userData)),
                    catchError(err => of(AuthActions.AuthActionsApi.loginapifail({ authError: err.error.error.message })))
                )
            })

        )
    )

    authSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.AuthActions.login),
            tap(() => {
                this.router.navigate(['/'])
            })
        )
    }, { dispatch: false })

    authLogout = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.AuthActions.logout),
            tap(() => {
                localStorage.removeItem('userData');
                this.authService.clearTokenExpirationTimer()
            })
        )
    }, {dispatch: false});

    authAutoLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.AuthActions.autologin),
        switchMap(() => {
            const localStorageUser = localStorage.getItem('userData')?.toString();
            if (localStorageUser) {
                const userData: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpirationDate: string;
                } = JSON.parse(localStorageUser);

                const loadedUser = new User(
                    userData.email,
                    userData.id,
                    userData._token,
                    new Date(userData._tokenExpirationDate)
                );

                if (loadedUser.token) {
                    return of(AuthActions.AuthActions.login({ user: loadedUser }));
                }
            }
            return of(AuthActions.AuthActions.login({ user: null }));
        })
    ))
}