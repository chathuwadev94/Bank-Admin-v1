import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {ForgotPasswordComponent} from './forgot-password.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [
      PagesRoutingModule,
      CommonModule,
      FormsModule,
      CarouselModule
  ]
})
export class PagesModule { }
