import {Component, OnInit} from '@angular/core';

export interface Hero {
    id: number,
    name: string
}


@Component({
    moduleId : module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})

export class AppComponent {

    title = 'Tour of heroes';


}
