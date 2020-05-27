import {Component, OnInit} from '@angular/core';
import {
    AboutMe,
    AboutTitle
} from '@corePath/models/common';
import {AuthService} from '@app/shared/services/auth.service';
import {Common} from '@app/core/enums';
import {FirebaseSnapshotsService} from '@app/shared/services/firebase-snapshots.service';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
    public isLogged: boolean            = false;
    public pageName: string             = Common.pageAboutName;
    public fieldTitleName: string       = Common.pageAboutTitleFieldName;
    public fieldMeName: string          = Common.pageAboutMeFieldName;
    public backEndDataTitle: AboutTitle = {
        title: '',
        description: '',
        workingPlaceName: '',
        workingPlaceUrl: ''
    };
    public backEndDataMe: AboutMe       = {
        email: '',
        phone: ''
    };

    constructor (
        private firebaseService: FirebaseSnapshotsService,
        private authService: AuthService
    ) {
        this.authService.isLoggedIn().subscribe(res => {
            this.isLogged = !!res;
        }, err => this.isLogged = false);
    }

    ngOnInit (): void {
        this.firebaseService.About().title.subscribe(data => {
            Object.assign(this.backEndDataTitle, data.payload.data());
        });
        this.firebaseService.About().me.subscribe(data => {
            Object.assign(this.backEndDataMe, data.payload.data());
        });
    }

}
