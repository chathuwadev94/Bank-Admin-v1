import {Component, Inject, OnInit} from '@angular/core';
import {GlobalVariable} from './core/com-classes';
import {EventEmitterService, GlobalService, GuardService, HttpService, ToastService} from './core/services';
import {NavigationStart, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private translate: TranslateService, private router: Router, private guard: GuardService, private gSev: GlobalService,
                private eventEmitSev: EventEmitterService, private toast: ToastService, private httpService: HttpService,
                public gVariable: GlobalVariable, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    }

    ngOnInit() {
        this.gVariable.waitingAppInit = true;
        this.loadConfig()
            .then((data: any) => {
                this.gVariable.appConfig = data;
                this.initApp();
                this.gVariable.waitingAppInit = false;
            }).catch((error: any) => {
            console.log(error);
        });
    }

    private initApp() {
        this.guard.canActivate();
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        const url = ['/login', '/change-password'];
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    if (url.indexOf(event.url) === -1) {
                        // this.guard.canActivate();
                        if (!this.gVariable.authentication.authorized) {
                            this.router.navigate(['/login']).then();
                            return false;
                        }
                    }
                }
            });

        if (this.gVariable.authentication.authorized) {
            this.analyzeSystemConfig();
        }

        this.eventEmitSev.httpError.subscribe(
            (response: any) => {
                this.showHttpError(response);
            }
        );

        this.eventEmitSev.loginSucceed.subscribe(
            () => {
                this.analyzeSystemConfig();
                this.router.navigate(['/dashboard']);
            }
        );
    }

    private analyzeSystemConfig() {
        this.gSev.loadWebStorage();
        this.gSev.setAvailableMenuList();
    }

    private showHttpError(response: any) {
        switch (response.status) {
            case -1:
                this.toast.showError('Service not working.');
                break;
            case 0:
                this.toast.showError('Service not working.');
                break;
            case 304:
                const eTag = response.headers.get('Etag');
                if (eTag) {
                    const res = eTag.replace(/"/g, '');
                    this.toast.showWarning(res);
                }
                break;
            case 401:
                this.toast.showInfo('Unauthorized. Invalid user.');
                this.guard.removeAuthentication();
                break;
            case 406:
                this.toast.showInfo('User is not authenticated to access the service.');
                this.guard.removeAuthentication();
                break;
            case 404:
                this.toast.showError('404 Not Found.');
                break;
            case 400:
                this.toast.showError('Bad Request.');
                break;
            case 500:
                this.toast.showError('System Error.');
                break;
            case 413:
                this.toast.showError('Request Entity Too Large.');
                break;
            default:
                break;
        }
    }

    private loadConfig() {
        const jsonFile = 'assets/app.config.json';
        return new Promise((resolve, reject) =>
            this.httpService.httpGetLocal(jsonFile)
                .then((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject({'error': 'no content 204'});
                    }
                }).catch((error: any) => {
                reject(error);
            }));
    }
}
