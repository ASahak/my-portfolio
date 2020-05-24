import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HomeTitleHiDirective} from './directives/home-title-hi.directive';
import {MainTitleComponent} from './components/main-title/main-title.component';
import {ButtonComponent} from './components/button/button.component';
import {ControlMessagesComponent} from './components/control-message/control-message.component';
import {InputComponent} from './components/input/input.component';
import {EditComponent} from './components/edit/edit.component';


@NgModule({
    declarations: [
        MainTitleComponent,
        HomeTitleHiDirective,
        ButtonComponent,
        ControlMessagesComponent,
        InputComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        HomeTitleHiDirective,
        MainTitleComponent,
        ButtonComponent,
        ControlMessagesComponent,
        InputComponent,
        EditComponent,
    ],
})
export class SharedModule {
}
