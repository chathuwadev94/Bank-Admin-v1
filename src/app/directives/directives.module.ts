import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FocusMeDirective} from './focusMe.directive';


@NgModule({
    declarations: [FocusMeDirective],
    imports: [
        CommonModule
    ],
    exports: [FocusMeDirective]
})
export class DirectivesModule {
}
