import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-single-work',
    templateUrl: './single-work.component.html',
    styleUrls: ['./single-work.component.scss']
})
export class SingleWorkComponent implements OnInit {
    public imgSrc: string;
    public name: string;
    public date: any;
    public dataPosition: number;
    public projectURL: string;
    public elementData: object;
    constructor () {
    }

    ngOnInit (): void {
        this.date = moment(this.date).format('ll');
    }

}
