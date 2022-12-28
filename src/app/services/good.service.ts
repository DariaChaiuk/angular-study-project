import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable, take, exhaustMap } from 'rxjs';
import { Good } from "../models/good";
import { UrlProvider } from '../utils/url.provider';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class GoodService {
    constructor(
        private store: Store<fromApp.AppState>,
        private http: HttpClient,
    ) { }

    getAll(): Observable<Good[]> {
        return this.store.select('auth').pipe(
            take(1),
            map(data => data.user),
            exhaustMap(user => {
                return this.http.get<Good[]>(`${UrlProvider.backendUrl}/${UrlProvider.goodUrl}.json`,{
                    params: new HttpParams().set('auth', user?.token || '')
                })
            }),
            map(goods => {
                const goodsArray = [];
                for (const key in goods) {
                    if (goods.hasOwnProperty(key)) {
                        goodsArray.push({ ...goods[key], id: key });
                    }
                }
                return goodsArray;
            })
        )
    }

    getById(id: string): Observable<Good> {
        return this.http.get<Good>(`${UrlProvider.backendUrl}/${UrlProvider.goodUrl}/${id}.json`)
            .pipe(
                map(i => {
                    return {
                        ...i,
                        id
                    }
                })
            );
    }

    update(newGood: Good, id: string): Observable<Good> {
        return this.http.put<Good>(`${UrlProvider.backendUrl}/${UrlProvider.goodUrl}/${id}.json`, newGood)
            .pipe(
                map(i => {
                    return {
                        ...i,
                        id
                    }
                })
            );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${UrlProvider.backendUrl}/${UrlProvider.goodUrl}/${id}.json`);
    }

    add(newGood: Good): Observable<Good> {
        return this.http.post<Good>(`${UrlProvider.backendUrl}/${UrlProvider.goodUrl}.json`, newGood)
        .pipe(
            map(i => {
                return {
                    ...newGood,
                    id: i['name']
                }
            })
        );
    }
}