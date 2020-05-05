import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeTitleHiDirective} from './directives/home-title-hi.directive';
import {MainTitleComponent} from './components/main-title/main-title.component';
import {ButtonComponent} from './components/button/button.component';


@NgModule({
    declarations: [
        MainTitleComponent,
        HomeTitleHiDirective,
        ButtonComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HomeTitleHiDirective,
        MainTitleComponent,
        ButtonComponent,
    ],
})
export class SharedModule {
}
