import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';

// Shared module
import {SharedModule} from './shared/shared.module';
import {AsideBarComponent} from '@corePath/components/aside-bar/aside-bar.component';
import {SVGComponent} from '@app/shared/components/Icons';
import {HomeComponent} from '@corePath/components/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        AsideBarComponent,
        SVGComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        SharedModule,
        // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
