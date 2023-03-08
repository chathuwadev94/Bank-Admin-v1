import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {GlobalVariable} from '../core/com-classes';
import {EventEmitterService, GuardService, ToastService} from '../core/services';
import {TranslateService} from '@ngx-translate/core';
import {AdminService} from '../api-services/internal';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {

    public showForgotPsw: boolean;
    public text: string;

    constructor(public router: Router, public gVariable: GlobalVariable, private guard: GuardService, private translate: TranslateService,
                private eventEmitSev: EventEmitterService, private adminSev: AdminService, private toastNot: ToastService,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    }

    ngOnInit() {
        this.showForgotPsw = false;
    }
}
