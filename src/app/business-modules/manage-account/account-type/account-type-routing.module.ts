import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountTypeComponent } from './account-type.component';
import { AccountTypeListComponent } from './account-type-list/account-type-list.component';


const routes: Routes = [
  {
    
      path: '',
      component: AccountTypeComponent,
      data: {
          title: 'Account-type'
      },
      children: [
          { path: 'account-type-list', component: AccountTypeListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTypeRoutingModule { }
