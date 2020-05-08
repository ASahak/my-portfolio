import {
    ChangeDetectorRef,
    ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, ApplicationRef
} from '@angular/core';
import {Router} from '@angular/router';
import {
    MAIN_FONT_BLUE_COLOR
} from '@corePath/constants';
import {RouterStateService} from '@app/shared/services/router-state.service';
import {Common} from '@corePath/enums';

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
export class HomeComponent implements OnInit {
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    public renderTpl: boolean     = true;
    private previousRoute: string = '';
    constructor (
        private ref: ChangeDetectorRef,
        private appTick: ApplicationRef,
        private router: Router,
        private routingState: RouterStateService

    ) {
    }

    triggerOnClick (data) {
      console.log(data);
    }

    ngOnInit (): void {
        this.previousRoute = this.routingState.getPreviousUrl();
        if (this.previousRoute !== Common.previousPath) {
            setTimeout(() => {
                this.renderTpl = false;
                this.appTick.tick();
                this.renderTpl = true;
            }, 3100);
        }
    }

}
