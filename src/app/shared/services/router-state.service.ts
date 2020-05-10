import { Injectable } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
    filter
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterStateService {
    private history = [];
    private routeRender: Subject<string> = new Subject();
    constructor (
        private router: Router
    ) {}

    public getSubjectRouter (): Observable < string > {
        return this.routeRender.asObservable();
    }
    RerenderTitles (): void {
        this.routeRender.next();
    }
    public loadRouting (): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(({urlAfterRedirects}: NavigationEnd) => {
                this.history = [...this.history, urlAfterRedirects];
            });
    }

    public getHistory (): string[] {
        return this.history;
    }

    public getPreviousUrl (): string {
        return this.history[this.history.length - 2] || null;
    }
}
