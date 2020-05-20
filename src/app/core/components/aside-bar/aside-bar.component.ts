import {Component, OnInit, AfterViewInit} from '@angular/core';
import {
    MAIN_FONT_BLUE_COLOR
} from '@corePath/constants';
import {
    Common
} from '@corePath/enums';
import { AngularFireStorage } from '@angular/fire/storage';
import {AuthService} from '@corePath/services/auth.service';

@Component({
    selector: 'app-aside-bar',
    templateUrl: './aside-bar.component.html',
    styleUrls: ['./aside-bar.component.scss'],
})
export class AsideBarComponent implements OnInit, AfterViewInit {
    public mainBlueColor: string = MAIN_FONT_BLUE_COLOR;
    public isLogged: boolean = false;
    public pdfURL: string = '';
    constructor (
        private authService: AuthService,
        private afStorage: AngularFireStorage
    ) {
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
