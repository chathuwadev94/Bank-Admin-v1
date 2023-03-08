import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatusConfigPipe} from './status-config.pipe';
import { CheckStatusPipe } from './check-status.pipe';
import { DomainConficPipe } from './domain-confic.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [StatusConfigPipe, CheckStatusPipe, DomainConficPipe],
    exports: [StatusConfigPipe, DomainConficPipe]
})
export class SharedPipesModule {
}
