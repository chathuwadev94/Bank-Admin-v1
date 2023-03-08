import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: {
        title: 'Customer'
    },
    children: [
        { path: 'customer-list', component: CustomerListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
