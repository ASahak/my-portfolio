import {Component} from '@angular/core';
import {
    fadeAnimation,
    slideInAnimation,
    thinking
} from './animation';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
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
    public allowTrigger: boolean  = false;
    public isLoading: boolean     = false;
    public previousRoute: string  = '';
    public navRouteName: string   = '';
    constructor (
        private router: Router,
        private routingState: RouterStateService
    ) {
        this.routingState.loadRouting();

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.navRouteName = val.url;
                this.previousRoute = this.routingState.getPreviousUrl();
                if (this.previousRoute && this.previousRoute !== this.navRouteName) {
                    this.routingState.RerenderTitles();
                }
            }
            if (val instanceof NavigationStart) {
                this.allowTrigger = true;
                const mainTag = document.querySelector('main');
                mainTag?.setAttribute('style', 'overflow: hidden');
                setTimeout(() => {
                    this.isLoading = true;
                    setTimeout(() => {
                        this.isLoading = false;
                        setTimeout(() => {
                            mainTag?.removeAttribute('style');
                        }, 1200);
                    }, 2000);
                }, 300);
            }
        });
    }
}
