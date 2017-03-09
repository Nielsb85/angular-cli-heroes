import {Injectable} from '@angular/core';
import {Hero} from "./heroes.component";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Observable, Subscription} from "rxjs";

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {

    }

    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl)
            .map(response => response.json().data as Hero[]);
    }


    getHeroesSlowly(): Observable<Hero[]> {
        return this.getHeroes();
    }


    getHero(id: number): Observable<Hero> {

        const url = `${this.heroesUrl}/${id}`
        return this.http.get(url)
            .map(response => response.json().data as Hero)
    }

    update(hero: Hero): Observable<any> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
    }

    create(name): Observable<Hero> {
        console.log('in create service');

        return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .map(response => response.json().data as Hero);
    }


    delete(id: number) : Observable<any> {
        const url = `${this.heroesUrl}/${id}`

        return this.http.delete(url)
            .map( response => response.json());
    }

    getTopHeroes(): Observable<Hero[]> {
        return this.getHeroesSlowly();
    }
}

