import {Component, OnInit, AfterViewInit} from '@angular/core';
import {
    MAIN_FONT_BLUE_COLOR
} from '@corePath/constants';
import {
    Common
} from '@corePath/enums';
import {
    AsideBarLinks
} from '@corePath/models/common';
import { AngularFireStorage } from '@angular/fire/storage';
import {AuthService} from '@app/shared/services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseSnapshotsService} from '@app/shared/services/firebase-snapshots.service';

@Component({
    selector: 'app-aside-bar',
    templateUrl: './aside-bar.component.html',
    styleUrls: ['./aside-bar.component.scss'],
})
export class AsideBarComponent implements OnInit, AfterViewInit {
    public mainBlueColor: string              = MAIN_FONT_BLUE_COLOR;
    public isLogged: boolean                  = false;
    public pdfURL: string                     = '';
    public asideBar: string                   = Common.asideBar;
    public asideBarFieldName: string          = Common.asideBarFieldName;
    public pageName: string                   = Common.messagesCollectionName;
    public modalName: string                  = Common.messagesFieldName;
    public messages                           = [];
    public asideBarLinks: AsideBarLinks | any = {
        fb: '',
        linkedin: '',
        github: '',
    };
    constructor (
        private firebaseService: FirebaseSnapshotsService,
        private firestore: AngularFirestore,
        private authService: AuthService,
        private afStorage: AngularFireStorage
    ) {
        this.firebaseService.Messages().subscribe(res => {
            this.messages = res.payload?.data()['messages'];
        });
        this.firebaseService.AsideBar().subscribe(res => {
            this.asideBarLinks = res.payload?.data();
        });
    }

    public logOut () {
        this.authService.logOut();
    }
    ngOnInit (): void {
        this.authService.isLoggedIn().subscribe(res => {
            this.isLogged = true;
        }, err => this.isLogged = false);
    }

    ngAfterViewInit (): void {
        const pdfCV = this.afStorage.ref(Common.CV_NAME);
        const url   =    pdfCV.getDownloadURL();
        url.toPromise().then(val => {
            this.pdfURL = val;
        });
    }
}
