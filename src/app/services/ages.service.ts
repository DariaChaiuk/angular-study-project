import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';
import { UrlProvider } from '../utils/url.provider';

@Injectable({ providedIn: 'root' })
export class AgesService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<string[]>{
       return this.http.get<string[]>(`${UrlProvider.backendUrl}/${UrlProvider.ageUrl}.json`).pipe(
        map(res => Object.values(res))
       );
    }
}