import {
    ChangeDetectorRef,
    ChangeDetectionStrategy, Component, OnInit, OnDestroy, ViewEncapsulation, ApplicationRef
} from '@angular/core';
import {Router} from '@angular/router';
import {
    MAIN_FONT_BLUE_COLOR
} from '@corePath/constants';
import {
    Home
} from '@corePath/models/common';
import {
    Common
} from '@corePath/enums';
import {RouterStateService} from '@app/shared/services/router-state.service';
import {AuthService} from '@app/shared/services/auth.service';
import {FirebaseSnapshotsService} from '@app/shared/services/firebase-snapshots.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'home-component'
    },
    changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit, OnDestroy {
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    public renderTpl: boolean     = true;
    private previousRouteSub      = null;
    private isLogged: boolean     = false;
    public pageName: string       = Common.pageHomeName;
    public fieldName: string      = Common.pageHomeFieldName;
    public backEndData: Home      = {title: '', subTitle: ''};
    constructor (
        private firebaseService: FirebaseSnapshotsService,
        private ref: ChangeDetectorRef,
        private appTick: ApplicationRef,
        private router: Router,
        private routingState: RouterStateService,
        private authService: AuthService

    ) {
        this.authService.isLoggedIn().subscribe(res => {
            this.isLogged = !!res;
        }, err => this.isLogged = false);

        this.previousRouteSub = this.routingState.getSubjectRouter().subscribe(() => {
            setTimeout(() => {
                this.renderTpl = false;
                this.appTick.tick();
                this.renderTpl = true;
            }, 3100);
        });
    }


    triggerOnClick (data) {
        this.router.navigate(['/contact']);
    }

    ngOnInit (): void {
        this.firebaseService.Home().subscribe(data => {
            Object.assign(this.backEndData, data.payload.data());
        });
    }
    ngOnDestroy () {
        this.previousRouteSub.unsubscribe();
    }
}
