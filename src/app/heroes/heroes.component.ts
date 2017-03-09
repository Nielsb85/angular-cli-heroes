import {Component, OnInit} from '@angular/core';
import {HeroService} from "./hero.service";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";


export interface Hero {
    id: number,
    name: string
}


@Component({
    moduleId: module.id,
    selector: 'heroes-component',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.scss'],
})

export class HeroesComponent implements OnInit {


    title = 'Tour of heroes';

    heroes: Subject<Hero[]> = new Subject<Hero[]>();


    private _heroList: Hero[];
    get heroList(): Hero[] {
        return this._heroList;
    }

    set heroList(value: Hero[]) {
        this._heroList = value;
        this.heroes.next(this._heroList);
    }


    selectedHero: Hero;

    constructor(private heroService: HeroService,
                private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(
                (heroes: Hero[]) => {
                    this.heroList = heroes;
                }
            );
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }


    add(name): void {
        name = name.trim();

        if (!name) return;
        console.log('name', name);
        this.heroService.create(name).subscribe(
            hero =>  {
                this.heroList = this.heroList.concat([hero]);
            }
        );
    }

    remove(hero: Hero): void {
        this.heroService.delete(hero.id).subscribe(
            _ => {
                this.heroList = this.heroList.filter( h => h !== hero);
            }
        )
    }


    goToDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id])
    }
}
