import {ApplicationRef, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {RouterStateService} from '@app/shared/services/router-state.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-main-title',
    templateUrl: './main-title.component.html',
    styleUrls: ['./main-title.component.scss']
})
export class MainTitleComponent implements OnInit, OnDestroy {
    @Input() text: string;
    @Input() interval: number;
    public rerender: boolean = true;
    private previousRouteSub: Subscription = null;
    constructor (
        private appTick: ApplicationRef,
        private routingState: RouterStateService
    ) {
        this.previousRouteSub = this.routingState.getSubjectRouter().subscribe(() => {
            setTimeout(() => {
                this.rerender = false;
                this.appTick.tick();
                this.rerender = true;
            }, 3100);
        });
    }

    ngOnInit () {
    }
    ngOnDestroy () {
        this.previousRouteSub.unsubscribe();
    }
}
