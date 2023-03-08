import {Injectable} from '@angular/core';

import {ApiServiceConfig, HttpService} from '../../core';

@Injectable()
export class ImageService {

    constructor(private httpService: HttpService) {}

    public upload(req: any) {
        const formattedReq = req;
        const promise = new Promise((resolve, reject) => {
            return this.httpService.httpPostFileUpload(ApiServiceConfig.IMAGE_SERVICE, '/upload', formattedReq, null)
                .then((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject('no content 204');
                    }
                }).catch(error => {
                    reject(error);
                });
        });
        return promise;
    }

    public imageGetById(id: number) {
        const promise = new Promise((resolve, reject) => {
            return this.httpService.httpGet(ApiServiceConfig.IMAGE_SERVICE, '/image?id=' + id, {}, null)
                .then((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject('no content 204');
                    }
                }).catch(error => {
                    reject(error);
                });
        });
        return promise;
    }
}
