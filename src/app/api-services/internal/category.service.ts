import { Injectable } from '@angular/core';
import {HttpService} from '../../core/services';
import {ApiServiceConfig} from '../../core/configs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService) {

  }

    public findCategoryByQuery(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.CATEGORY_SERVICE, '/category/search', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    // console.log(e);
                    reject(e);
                });
        });

        return promise;
    }

    public createCategory(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.CATEGORY_SERVICE, '/category', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    // console.log(e);
                    reject(e);
                });
        });

        return promise;
    }

    public updateCategory(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.CATEGORY_SERVICE, '/category', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    // console.log(e);
                    reject(e);
                });
        });

        return promise;
    }

    public setStatus(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.CATEGORY_SERVICE, '/update_status', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    // console.log(e);
                    reject(e);
                });
        });

        return promise;
    }

}
