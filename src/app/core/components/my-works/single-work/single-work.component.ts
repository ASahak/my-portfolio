import {Component, EventEmitter, OnInit} from '@angular/core';
import * as moment from 'moment';
import {AngularFirestore} from '@angular/fire/firestore';

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
    public elementData: any = {
        width: null,
        height: null,
        x: null,
        y: null
    };

    public isLogged: boolean;
    public isPublic: boolean;
    public pageName: string;
    public idProject: string;
    public fieldWorksName: string;
    constructor (
        private firestore: AngularFirestore,
    ) {
    }

    ngOnInit (): void {
        this.date = moment(this.date).format('ll');
    }
    public emitRemove (id) {
        let mainData = [];
        this.firestore.doc(this.pageName + '/' + this.fieldWorksName).get().subscribe(data => {
            mainData = data.data()?.list;
            const findIndex = mainData.findIndex(project => project.id === id);
            if (findIndex !== -1) {
                mainData.splice(findIndex, 1);
                this.firestore.doc(this.pageName + '/' + this.fieldWorksName)
                    .update({list: mainData});
            }
        });
    }

}
