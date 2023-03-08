import {Injectable, Inject} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../../core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import * as sha256 from 'js-sha256';

@Injectable()
export class AdminService {

    constructor(private httpService: HttpService, private gVariable: GlobalVariable,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }


    public login(req) {
        const formattedReq = {
            'username': req.loginName || null,
            'password': sha256.sha256(req.password).toUpperCase() || null,
        };
        return new Promise((resolve, reject) =>
            this.httpService.httpPost(ApiServiceConfig.USER_SERVICE,'/userLogin', formattedReq, {})
                .then((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject('no content 204');
                    }
                }).catch((error: any) => {
                reject(error);
            }));
    }

    public forgotPassword(req) {
        const promise = new Promise((resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.USER_SERVICE, '/reset_password', req , null)
                .then((data: any) => {
                        resolve(data);

                }).catch((error: any) => {
                    reject(error);
                });
        });
        return promise;
    }
}
