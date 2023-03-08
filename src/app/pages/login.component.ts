import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {GlobalVariable} from '../core/com-classes';
import {EventEmitterService, GuardService, ToastService} from '../core/services';
import {TranslateService} from '@ngx-translate/core';
import {NgForm} from '@angular/forms';
import {AdminService} from '../api-services/internal';
import {StaticConfig} from '../core/configs';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    public loginReq: any = {};
    public showForgotPsw: boolean;
    public text: string;
    public toggle: boolean;
    public required: boolean;
    public noPause: any;
    public toggleReset: boolean;

    constructor(public router: Router, public gVariable: GlobalVariable, private guard: GuardService, private translate: TranslateService,
                private eventEmitSev: EventEmitterService, private adminSev: AdminService, private toastNot: ToastService,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    }

    ngOnInit() {
        this.showForgotPsw = false;
        this.toggle = false;
    }

    onClickForgotPsw() {
        this.randomText();
        this.showForgotPsw = true;
    }

    onLoggedIn(form: NgForm) {
        if (form.valid) {
            this.toggle = true;
            this.gVariable.waitingAppInit = true;
            this.adminSev.login(Object.assign({}, form.value)).then((data: any) => {
                if (data) {
                    this.storage.remove(StaticConfig.STORAGE_KEY.AUTHENTICATION_PSW);
                    this.guard.createAuthentication(data);
                    this.gVariable.waitingAppInit = false;
                    this.eventEmitSev.onBroadcastLoginSucceed();
                } else {
                    this.toastNot.showError(data.authStatusDisplay);
                    this.toggle = false;
                }
            }).catch((error: any) => {
                this.toggle = false;
                this.gVariable.waitingAppInit = false;
            });
        }
    }

    onEnterValue(key: string) {
        setTimeout(() => {
            switch (key) {
                case 'email' :
                    this.loginReq.userName = '';
                    this.required = true;
                    break;
                case 'username' :
                    this.loginReq.email = '';
                    this.required = false;
                    break;
            }
        }, 0);

    }

    onForgotPassword(form: NgForm) {
        if (form.valid) {
            this.toggleReset = true;
            const req = {
                'email': form.value.email || null,
                'username': form.value.userName || null
            };
            this.adminSev.forgotPassword(req).then((response: any) => {
                    this.toastNot.showSuccess('Password Recovery successful! ' +
                        'Please check your email and complete the confirmation.');
                    form.resetForm();
                this.showForgotPsw = false;
                    this.randomText();
                    this.toggleReset = false;
                }).catch((error: any) => {
                this.randomText();
                this.toggleReset = false;
            });
        }
    }

    onClickCancel() {
        this.showForgotPsw = false;
        this.loginReq = {};
    }

    private randomText() {
        this.text = this.makeRandom();
    }

    private makeRandom() {
        let randomString = '';
        let randomInteger = '';
        const possibleString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const possibleInteger = '1234567890';
        const lengthOfCode = 4;
        for (let i = 0; i < lengthOfCode; i++) {
            randomInteger += possibleInteger.charAt(Math.floor(Math.random() * possibleInteger.length));
        }
        for (let i = 0; i < lengthOfCode; i++) {
            randomString += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
        }
        return randomInteger + '-' + randomString;
    }
}
