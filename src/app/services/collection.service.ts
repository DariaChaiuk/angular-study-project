import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, map, take, exhaustMap } from 'rxjs';
import { UrlProvider } from '../utils/url.provider';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class CollectionService {
    constructor(
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
    ) { }

    getAll(): Observable<string[]> {
        return this.store.select('auth').pipe(
            take(1),
            map(data => data.user),
            exhaustMap(user => {
                return this.http.get<string[]>(`${UrlProvider.backendUrl}/${UrlProvider.collectionUrl}.json`,
                    {
                        params: new HttpParams().set('auth', user?.token || '')
                    });
            }),
            map(res => Object.values(res))
        )
    }

    getItem(id: string): Observable<string> {
        return this.http.get<string>(`${UrlProvider.backendUrl}/${UrlProvider.collectionUrl}/${id}.json`);
    }
}