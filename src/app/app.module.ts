import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from '../environments/environment.prod';

// Shared module
import {SharedModule} from './shared/shared.module';
import {DialogModule} from './shared/components/dialog/dialog.module';
import {AsideBarComponent} from '@corePath/components/aside-bar/aside-bar.component';
import {SVGComponent} from '@app/shared/components/Icons';

// Edit Modals
import {HomeTitleComponent} from '@app/core/components/edit-modals/home-title/home-title.component';
import {AboutTitleComponent} from '@app/core/components/edit-modals/about-title/about-title.component';
import {AboutContactMeComponent} from '@app/core/components/edit-modals/about-contact-me/about-contact-me.component';
import {SkillsTitleComponent} from '@app/core/components/edit-modals/skills-title/skills-title.component';
import {SkillsListComponent} from '@app/core/components/edit-modals/skills-list/skills-list.component';
import {AddUpdateProjectComponent} from '@app/core/components/edit-modals/add-update-project/add-update-project.component';
import {EditLinksComponent} from '@app/core/components/edit-modals/edit-links/edit-links.component';
import {ContactSendMessagesComponent} from '@app/core/components/edit-modals/contact-send-messages/contact-send-messages.component';

// Pages
import {HomeComponent} from '@corePath/components/home/home.component';
import {NotFoundComponent} from '@corePath/components/not-found/not-found.component';
import {MainLoadingComponent} from '@app/shared/components/main-loading/main-loading.component';
import {ContactMeComponent} from '@corePath/components/contact-me/contact-me.component';
import {AboutMeComponent} from '@corePath/components/about-me/about-me.component';
import {SkillsComponent} from '@corePath/components/skills/skills.component';
import {MyWorksComponent} from '@corePath/components/my-works/my-works.component';
import {ProgramsComponent} from '@corePath/components/programs/programs.component';
import {SingleProgrammComponent} from '@corePath/components/programs/single-programm/single-programm.component';
import {SingleWorkComponent} from '@corePath/components/my-works/single-work/single-work.component';
import {AdminComponent} from '@corePath/components/admin/admin.component';

@NgModule({
    entryComponents: [
        HomeTitleComponent,
        AboutTitleComponent,
        AboutContactMeComponent,
        SkillsTitleComponent,
        SkillsListComponent,
        AddUpdateProjectComponent,
        SingleProgrammComponent,
        SingleWorkComponent,
        EditLinksComponent,
        ContactSendMessagesComponent,
    ],
    declarations: [
        AppComponent,
        AsideBarComponent,
        SVGComponent,
        HomeComponent,
        NotFoundComponent,
        MainLoadingComponent,
        ContactMeComponent,
        AboutMeComponent,
        SkillsComponent,
        MyWorksComponent,
        ProgramsComponent,
        SingleProgrammComponent,
        AdminComponent,
        HomeTitleComponent,
        AboutContactMeComponent,
        AboutTitleComponent,
        SkillsTitleComponent,
        SkillsListComponent,
        AddUpdateProjectComponent,
        SingleWorkComponent,
        EditLinksComponent,
        ContactSendMessagesComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        SharedModule,
        DialogModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
