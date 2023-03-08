import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerRemoveComponent } from './customer-remove/customer-remove.component';
import { DataGridModule } from '../../../modules/data-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from '../../../shared';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularDraggableModule } from 'angular2-draggable';
import { DirectivesModule } from '../../../directives/directives.module';


@NgModule({
  declarations: [CustomerComponent, CustomerListComponent, CustomerCreateComponent, CustomerDetailsComponent, CustomerRemoveComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DataGridModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,
    ModalModule.forRoot(),
    AngularDraggableModule,
    DirectivesModule
  ],
  entryComponents:[CustomerCreateComponent,CustomerDetailsComponent,CustomerRemoveComponent]
})
export class CustomerModule { }
