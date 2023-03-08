import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommunityUserRoutingModule} from './community-user-routing.module';
import {CommunityUserListComponent} from './community-user-list/community-user-list.component';
import {CommunityUserDetailsComponent} from './community-user-details/community-user-details.component';
import {CommunityUserComponent} from './community-user.component';
import {DataGridModule} from '../../../modules/data-grid';
import {FormsModule} from '@angular/forms';
import {ComUserSetStatusComponent} from './com-user-set-status/com-user-set-status.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {SharedPipesModule} from '../../../shared';
import {DirectivesModule} from '../../../directives/directives.module';
import {ModalModule} from 'ngx-bootstrap/modal';


@NgModule({
    declarations: [CommunityUserListComponent, CommunityUserDetailsComponent, CommunityUserComponent, ComUserSetStatusComponent],
    imports: [
        CommonModule,
        CommunityUserRoutingModule,
        DataGridModule,
        FormsModule,
        ModalModule.forRoot(),
        SharedPipesModule,
        AngularDraggableModule,
        DirectivesModule
    ],
    entryComponents: [CommunityUserDetailsComponent, ComUserSetStatusComponent]
})
export class CommunityUserModule {
}
