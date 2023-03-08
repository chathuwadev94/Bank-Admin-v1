import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountTypeRoutingModule } from './account-type-routing.module';
import { AccountTypeComponent } from './account-type.component';
import { DataGridModule } from '../../../modules/data-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from '../../../shared';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularDraggableModule } from 'angular2-draggable';
import { DirectivesModule } from '../../../directives/directives.module';
import { AccountTypeListComponent } from './account-type-list/account-type-list.component';
import { CreateAccountTypeComponent } from './create-account-type/create-account-type.component';
import { ViewAccountTypeComponent } from './view-account-type/view-account-type.component';
import { RemoveAccountTypeComponent } from './remove-account-type/remove-account-type.component';


@NgModule({
  declarations: [AccountTypeComponent, AccountTypeListComponent, CreateAccountTypeComponent, ViewAccountTypeComponent, RemoveAccountTypeComponent],
  imports: [
    CommonModule,
    AccountTypeRoutingModule,
    DataGridModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,
    ModalModule.forRoot(),
    AngularDraggableModule,
    DirectivesModule
  ],
  entryComponents:[CreateAccountTypeComponent,ViewAccountTypeComponent,RemoveAccountTypeComponent]
  
})
export class AccountTypeModule { }
