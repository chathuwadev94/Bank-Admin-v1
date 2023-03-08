import { Injectable } from '@angular/core';
import { HttpService, ApiServiceConfig } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService:HttpService) { }

  public findByCustomer(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPost(ApiServiceConfig.CUSTOMER_SERVICE, '/findByCustomer', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}

public createCustomer(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPost(ApiServiceConfig.CUSTOMER_SERVICE, '/createCustomer', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}

public updateCustomer(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPut(ApiServiceConfig.CUSTOMER_SERVICE, '/updateCustomer', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}

public removeCustomer(req: any) {
    const promise = new Promise( (resolve, reject) => {
        return this.httpService.httpPut(ApiServiceConfig.CUSTOMER_SERVICE, '/removeCustomer', req, {})
            .then( (response: any) => {
                resolve(response);
            }).catch( (e: any) => {
                reject(e);
            });
    });
    return promise;
}
}
