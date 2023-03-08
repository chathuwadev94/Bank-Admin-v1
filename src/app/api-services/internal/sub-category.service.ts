import { Injectable } from '@angular/core';
import {ApiServiceConfig} from '../../core/configs';
import {HttpService} from '../../core/services';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private httpService: HttpService) { }

    public findSubCategoryByQuery(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.SUB_CATEGORY_SERVICE, '/sub_category/search', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    // console.log(e);
                    reject(e);
                });
        });

        return promise;
    }

    public createSubCategory(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPost(ApiServiceConfig.SUB_CATEGORY_SERVICE, '/sub_category', req, {})
                .then( (response: any) => {
                    resolve(response);
                }).catch( (e: any) => {
                    // console.log(e);
                    reject(e);
                });
        });

        return promise;
    }

    public updateSubCategory(req: any) {
        const promise = new Promise( (resolve, reject) => {
            return this.httpService.httpPut(ApiServiceConfig.SUB_CATEGORY_SERVICE, '/sub_category', req, {})
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
            return this.httpService.httpPut(ApiServiceConfig.SUB_CATEGORY_SERVICE, '/update_status', req, {})
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
