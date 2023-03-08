import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from './forgot-password.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Example Pages'
        },
        children: [
            {path: 'login', component: LoginComponent, data: {title: 'Login Page'}},
            {path: 'change-password', component: ForgotPasswordComponent, data: {title: 'Change Password'}}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
