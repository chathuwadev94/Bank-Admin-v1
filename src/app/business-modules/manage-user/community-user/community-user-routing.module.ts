import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityUserListComponent} from './community-user-list/community-user-list.component';
import {CommunityUserComponent} from './community-user.component';

const routes: Routes = [
    {
        path: '',
        component: CommunityUserComponent,
        data: {
            title: 'Community User'
        },
        children: [
            { path: 'community-user-list', component: CommunityUserListComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityUserRoutingModule { }
