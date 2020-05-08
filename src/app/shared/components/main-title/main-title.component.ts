import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-main-title',
    templateUrl: './main-title.component.html',
    styleUrls: ['./main-title.component.scss']
})
export class MainTitleComponent implements OnInit {
    @Input() text: string;
    @Input() interval: number;

    constructor () {
    }

    ngOnInit () {}

}
