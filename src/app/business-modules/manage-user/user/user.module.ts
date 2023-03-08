import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {UserListComponent} from './user-list/user-list.component';
import {DataGridModule} from '../../../modules/data-grid';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import{AdminUserRemoveComponent} from './admin-user-remove/admin-user-remove.component'
import {SharedPipesModule} from '../../../shared';
import { SetStatusComponent } from './set-status/set-status.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {DirectivesModule} from '../../../directives/directives.module';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [UserComponent, UserListComponent, AdminUserDetailsComponent, AdminUserCreateComponent, SetStatusComponent, AdminUserRemoveComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        DataGridModule,
        FormsModule,
        ReactiveFormsModule,
        SharedPipesModule,
        ModalModule.forRoot(),
        AngularDraggableModule,
        DirectivesModule
    ],
    entryComponents: [AdminUserDetailsComponent, AdminUserCreateComponent, SetStatusComponent,AdminUserRemoveComponent]
})
export class UserModule {
}
