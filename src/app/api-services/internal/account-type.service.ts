import { Injectable } from '@angular/core';
import { HttpService, ApiServiceConfig } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  constructor(private httpService: HttpService) { }

  public findByAccTypes(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPost(ApiServiceConfig.ACC_TYPE_SERVICE, '/findByAccType', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}

public createAccTypes(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPost(ApiServiceConfig.ACC_TYPE_SERVICE, '/createAccType', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}
public updateAccTypes(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPut(ApiServiceConfig.ACC_TYPE_SERVICE, '/updateAccType', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}

public removeAccTypes(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPut(ApiServiceConfig.ACC_TYPE_SERVICE, '/removeAccType', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}
}
