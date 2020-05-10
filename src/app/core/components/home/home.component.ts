import {
    ChangeDetectorRef,
    ChangeDetectionStrategy, Component, OnInit, OnDestroy, ViewEncapsulation, ApplicationRef
} from '@angular/core';
import {Router} from '@angular/router';
import {
    MAIN_FONT_BLUE_COLOR
} from '@corePath/constants';
import {RouterStateService} from '@app/shared/services/router-state.service';

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
    private previousRouteSub = null;
    constructor (
        private ref: ChangeDetectorRef,
        private appTick: ApplicationRef,
        private router: Router,
        private routingState: RouterStateService

    ) {
        this.previousRouteSub = this.routingState.getSubjectRouter().subscribe(() => {
            setTimeout(() => {
                this.renderTpl = false;
                this.appTick.tick();
                this.renderTpl = true;
            }, 3100);
        });
    }

    triggerOnClick (data) {
    }

    ngOnInit (): void {
    }
    ngOnDestroy () {
        this.previousRouteSub.unsubscribe();
    }
}
