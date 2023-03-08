import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule
  ],
  declarations: [BusinessComponent]
})
export class BusinessModule { }
