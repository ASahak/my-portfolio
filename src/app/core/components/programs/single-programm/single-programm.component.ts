import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
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
    @Input('is-logged') isLogged: boolean;
    @Input('is-public') isPublic: boolean;
    @Input('page-name') pageName: string;
    @Input('id-project') idProject: string;
    @Input('field-programs-name') fieldProgramsName: string;
    @Output() remove = new EventEmitter<any>();
    public momentDate;
    constructor () {
    }

    public emitRemove () {
        this.remove.emit();
    }
    ngOnInit (): void {
        this.momentDate = moment(this.data?.preparedDate).format('ll');
    }

}
