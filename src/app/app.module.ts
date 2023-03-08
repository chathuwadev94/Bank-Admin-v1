import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import {HeaderComponent} from './components/header/header.component';
// import {APP_SIDEBAR_NAV} from './components/sidebar/sidebar.component';
import {FullLayoutComponent} from './containers/full-layout';
import {SimpleLayoutComponent} from './containers/simple-layout';
// @ts-ignore
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StorageServiceModule} from 'angular-webstorage-service';
import {GlobalVariable} from './core/com-classes';
import {EventEmitterService, GlobalService, GuardService, HttpService, ToastService} from './core/services';
import {ToastrModule} from 'ng6-toastr-notifications';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AdminService} from './api-services/internal';
import {CategoryService, UserService, ImageService} from './api-services/internal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';

const API_SERVICES = [
    AdminService,
    CategoryService,
    UserService,
    ImageService
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        StorageServiceModule,
        ToastrModule.forRoot(),
        ModalModule,
        BsDropdownModule.forRoot()
    ],
    declarations: [AppComponent, FullLayoutComponent, HeaderComponent, SimpleLayoutComponent, SidebarComponent, FooterComponent],
    providers: [
        AuthGuard,
        DatePipe,
        DecimalPipe,
        HttpService,
        GlobalVariable,
        GuardService,
        EventEmitterService,
        ToastService,
        GlobalService,
        API_SERVICES
        ],
    bootstrap: [AppComponent]
})
export class AppModule {}
