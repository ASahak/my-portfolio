import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Components
import {HomeComponent} from '@corePath/components/home/home.component';
import {NotFoundComponent} from '@corePath/components/not-found/not-found.component';
import {ContactMeComponent} from '@corePath/components/contact-me/contact-me.component';
import {AboutMeComponent} from '@corePath/components/about-me/about-me.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, data: {animation: 'HomePage'}},
    {path: '404', component: NotFoundComponent, data: {animation: '404'}},
    {path: 'contact', component: ContactMeComponent},
    {path: 'about', component: AboutMeComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled'
        })
    ],
    exports: [
        RouterModule,
        BrowserAnimationsModule,
    ]
})
export class AppRoutingModule {
}
