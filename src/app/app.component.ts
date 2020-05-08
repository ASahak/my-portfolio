import {Component} from '@angular/core';
import {
    fadeAnimation,
    slideInAnimation,
    thinking
} from './animation';
import {Router, NavigationStart} from '@angular/router';
import {RouterStateService} from '@app/shared/services/router-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        thinking,
        fadeAnimation,
        slideInAnimation
    ],
})
export class AppComponent {
    public allowTrigger: boolean = false;
    public isLoading: boolean    = false;
    constructor (
        private router: Router,
        private routingState: RouterStateService
    ) {
        this.routingState.loadRouting();

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationStart) {
                this.allowTrigger = true;
                setTimeout(() => {
                    this.isLoading = true;
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 2000);
                }, 300);
            }
        });
    }
}
