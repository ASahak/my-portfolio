import {Component, OnInit} from '@angular/core';
import {
    MAIN_FONT_BLUE_COLOR
} from '@corePath/constants';

@Component({
    selector: 'app-aside-bar',
    templateUrl: './aside-bar.component.html',
    styleUrls: ['./aside-bar.component.scss'],
})
export class AsideBarComponent implements OnInit {
    public mainBlueColor: string = MAIN_FONT_BLUE_COLOR;
    constructor () {
    }

    ngOnInit (): void {
    }

}
