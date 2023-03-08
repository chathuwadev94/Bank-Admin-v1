import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeysPipe} from './keys.pipe';
import {FilterEntitlementPipe} from './filter.pipe';
import { FilterSearchPipe } from './filter-search.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [KeysPipe, FilterEntitlementPipe, FilterSearchPipe],
  exports: [ KeysPipe, FilterEntitlementPipe, FilterSearchPipe ]
})
export class PipeModule { }
