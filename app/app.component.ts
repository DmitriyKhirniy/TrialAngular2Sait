import { Component } from '@angular/core';
import {MainComponent} from "./components/main.component";
import {TitleComponent} from "./components/title.component";
@Component({
    selector: 'app',
    //template: '<main-component [status]="Completed"></main-component>',
    templateUrl: 'app/html/main.coponent.html',
    directives: [MainComponent, TitleComponent],
    styleUrls: ['app/styles/main.style.css']
})
export class AppComponent {  }
