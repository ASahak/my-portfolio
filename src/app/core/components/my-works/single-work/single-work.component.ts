import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-single-work',
    templateUrl: './single-work.component.html',
    styleUrls: ['./single-work.component.scss']
})
export class SingleWorkComponent implements OnInit {
    public imgSrc: string;
    public dataPosition: number;
    public projectURL: string;
    public elementData: object;
    constructor () {
    }

    ngOnInit (): void {
    }

}
