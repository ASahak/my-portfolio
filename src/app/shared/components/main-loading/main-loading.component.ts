import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {
    MAIN_FONT_BLUE_COLOR
} from '@corePath/constants';

@Component({
    selector: 'app-main-loading',
    templateUrl: './main-loading.component.html',
    styleUrls: ['./main-loading.component.scss'],
    host: {
        class: 'main-loading-container'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLoadingComponent implements OnInit {
    public mainBlueColor: string = MAIN_FONT_BLUE_COLOR;
    constructor () {
    }

    ngOnInit (): void {
    }

}
