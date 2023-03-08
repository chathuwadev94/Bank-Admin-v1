import { Injectable } from '@angular/core';
import {HttpService} from '../../core/services';
import {ApiServiceConfig} from '../../core/configs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

    public findUserByQuerys(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.USER_SERVICE, '/findByUser', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }

    public findUsers(){
        const promise=new Promise((resolve,reject)=>{
            return this.httpService.httpGet(ApiServiceConfig.USER_SERVICE,'/findUsers',{},{})
            .then((response:any)=>{
                resolve(response);
            }).catch((e:any)=>{
                reject(e);
            })
        });
        return promise;
    }

    public createUser(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.USER_SERVICE, '/userRegister', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }

    public updateUser(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.USER_SERVICE, '/updateUser', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }

    public removeUser(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.USER_SERVICE, '/removeUser', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }

    public changeRole(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.USER_SERVICE, '/changeRole', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }


    public findCommunityUserByQuery(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.COMMUNITY_USER_SERVICE, '/community_user/search', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }

    public setStatus(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.USER_SERVICE, '/update_status', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }

    public setComUserStatus(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.COMMUNITY_USER_SERVICE, '/update_status', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }

    public findCategoryByQuery(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.CATEGORY_SERVICE, '/category/search', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    reject(e);
                });
        });
        return promise;
    }
}
