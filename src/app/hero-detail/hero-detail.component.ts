import {Component, OnInit, Input} from '@angular/core';
import {Hero} from "../heroes/heroes.component";
import 'rxjs/add/operator/switchMap';
import {HeroService} from "../heroes/hero.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
@Component({
    moduleId: module.id,
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

    @Input()
    hero: Hero;

    constructor(private heroService: HeroService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => {
                this.hero = hero;
            });

    }

    save(): void {
        this.heroService
            .update(this.hero)
            .subscribe( hero => {
                console.log('hero', hero);
            });
    }

    goBack() {
        this.location.back();
    }

}
