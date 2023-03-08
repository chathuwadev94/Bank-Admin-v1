import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessComponent } from './business.component';
import {importExpr} from '@angular/compiler/src/output/output_ast';

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    data: {
      title: 'Home'
    },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'manage-user/user', loadChildren: () => import('./manage-user/user/user.module').then(m => m.UserModule)},
      { path:'manage-account/account-type', loadChildren:()=>import('./manage-account/account-type/account-type.module').then(m=>m.AccountTypeModule)},
      {path:'manage-customer/customer', loadChildren:()=>import('./manage-customer/customer/customer.module').then(c=>c.CustomerModule)}
      // {path: 'manage-user/community', loadChildren: () => import('./manage-user/community-user/community-user.module').then(m => m.CommunityUserModule)},
        // {path: 'master-data/category', loadChildren: () => import('./master-data/category/category.module').then(m => m.CategoryModule)},
        // {path: 'master-data/sub-category', loadChildren: () => import('./master-data/sub-category/sub-category.module').then(m => m.SubCategoryModule)}
      // { path: 'admin/employee', loadChildren: () => import('./admin/employee/employee.module').then(m => m.EmployeeModule) },
      // { path: 'admin/company-location', loadChildren: () => import('./admin/company-location/company-location.module').then(m => m.CompanyLocationModule) },
      // { path: 'admin/report', loadChildren: () => import('./admin/admin-report/admin-report.module').then(m => m.AdminReportModule) },
      // { path: 'Admin/account', loadChildren: () => import('./admin/account/account.module').then(m => m.AccountModule) },
      // { path: 'admin/role-group', loadChildren: () => import('./admin/role-group/role-group.module').then(m => m.RoleGroupModule) },
      // { path: 'client-customer/customer', loadChildren: () => import('./client-customer/customer/customer.module').then(m => m.CustomerModule) },
      // { path: 'admin/employee-notification', loadChildren: () => import('./admin/employee-notification/employee-notification.module').then(m => m.EmployeeNotificationModule)},
      // { path: 'admin/site', loadChildren: () => import('./admin/site/site.module').then(m => m.SiteModule)},
      // { path: 'notification/employee-notification-group', loadChildren: () => import('./notification/employee-notification-group/employee-notification-group.module').then(m => m.EmployeeNotificationGroupModule)},
      // { path: 'notification/customer-notification-group', loadChildren: () => import('./notification/customer-notification-group/customer-notification-group.module').then(m => m.CustomerNotificationGroupModule)},
      // { path: 'notification/manual-notification', loadChildren: () => import('./notification/manual-notification/manual-notification.module').then(m => m.ManualNotificationModule)},

        // { path: 'notification/notification-list', loadChildren: () => import('./notification/notification-list/notification-list.module').then(m => m.NotificationListModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class BusinessRoutingModule { }
