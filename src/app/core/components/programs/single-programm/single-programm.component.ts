import {Component, OnInit, Input} from '@angular/core';
import {
    Programms
} from '@corePath/models/common';
import * as moment from 'moment';

@Component({
    selector: 'app-single-programm',
    templateUrl: './single-programm.component.html',
    styleUrls: ['./single-programm.component.scss']
})
export class SingleProgrammComponent implements OnInit {
    @Input() data: Programms;
    public momentDate;
    constructor () {
    }

    ngOnInit (): void {
        this.momentDate = moment(this.data?.preparedDate).format('ll');
    }

}
