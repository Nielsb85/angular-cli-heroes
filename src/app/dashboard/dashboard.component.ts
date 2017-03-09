import {Component, OnInit} from '@angular/core';
import {Hero} from "../app.component";
import {HeroService} from "../heroes/hero.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';


@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    heroes: Observable<Hero[]>;

    constructor(private heroService: HeroService) {
    }

    ngOnInit(): void {
        this.heroes = this.heroService.getTopHeroes().do((response) => {
            console.log('response', response);
        });
        console.log('heroes', this.heroes);
    }

}
