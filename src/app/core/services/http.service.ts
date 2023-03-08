import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalVariable} from '../com-classes';
import {EventEmitterService} from './event-emitter.service';
import {ToastService} from './toast.service';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient, private gVariable: GlobalVariable, private toastNot: ToastService,
                private eventEmitterSev: EventEmitterService) {
    }

    private getApiPath(sevConfig: any) {
        let url = '';
        switch (sevConfig.KEY) {
            case 'BANK_A_SEV':
                url = this.gVariable.appConfig ? this.gVariable.appConfig.BANK_API_URL.PUBLIC : '';
                break;
            default :
                break;
        }
        return url;
    }

    public httpGetLocal(path: string) {
        return new Promise((resolve, reject) => {
            const header = new HttpHeaders().set('Content-Type', 'application/json');
            const httpHeaders = this.setHeader(header, {}, {});
            const url = path;
            return this.httpClient.get(url, {headers: httpHeaders})
                .toPromise()
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    this.eventEmitterSev.onBroadcastHttpError(error);
                    reject(error);
                });
        });
    }

    public httpGet(sevConfig: any, path: string, body: any, headerValue: any) {
        return new Promise((resolve, reject) => {
            const header = new HttpHeaders().set('Content-Type', 'application/json');
            const httpHeaders = this.setHeader(header, headerValue, sevConfig);
            let apiPath: string;
            apiPath = this.getApiPath(sevConfig);
            const url = apiPath + sevConfig.ROUTE_PATH + path;
            return this.httpClient.get(url, {headers: httpHeaders})
                .toPromise()
                .then((response: any) => {
                    resolve(response);
                })
                .catch(error => {
                    this.eventEmitterSev.onBroadcastHttpError(error);
                    reject(error);
                });
        });
    }

    public httpPost(sevConfig: any, path: string, body: any, headerValue: any) {
        return new Promise((resolve, reject) => {
            const reqBody: string = JSON.stringify(body);
            let header: HttpHeaders;
            header = new HttpHeaders().set('Content-Type', 'application/json');
            const httpHeaders = this.setHeader(header, headerValue, sevConfig);
            const apiPath = this.getApiPath(sevConfig);
            const url = apiPath + sevConfig.ROUTE_PATH + path;
            return this.httpClient.request('POST', url, {body: reqBody, headers: httpHeaders})
                .toPromise()
                .then((response: any) => {
                    resolve(response);
                })
                .catch(error => {
                    this.eventEmitterSev.onBroadcastHttpError(error);
                    reject(error);
                });
        });
    }

    public httpPut(sevConfig: any, path: string, body: any, headerValue: any) {
        return new Promise((resolve, reject) => {
            const reqBody = JSON.stringify(body);
            const header = new HttpHeaders().set('Content-Type', 'application/json');
            const httpHeaders = this.setHeader(header, headerValue, sevConfig);
            const apiPath = this.getApiPath(sevConfig);
            const url = apiPath + sevConfig.ROUTE_PATH + path;
            return this.httpClient.request('PUT', url, {body: reqBody, headers: httpHeaders})
                .toPromise()
                .then((response: any) => {
                        resolve(response);
                })
                .catch(error => {
                    this.eventEmitterSev.onBroadcastHttpError(error);
                    reject(error);
                });
        });
    }

    public httpDelete(sevConfig: any, path: string, body: any, headerValue: any) {
        return new Promise((resolve, reject) => {
            const reqBody = JSON.stringify(body);
            const header = new HttpHeaders().set('Content-Type', 'application/json');
            const httpHeaders = this.setHeader(header, headerValue, sevConfig);
            const apiPath = this.getApiPath(sevConfig);
            const url = apiPath + sevConfig.ROUTE_PATH + path;
            return this.httpClient.request('DELETE', url, {body: reqBody, headers: httpHeaders})
                .toPromise()
                .then((response: any) => {
                    if (response.responseStatusId === 1) {
                        resolve(response);
                    } else {
                        this.analyzeResponse(response);
                    }
                })
                .catch(error => {
                    this.eventEmitterSev.onBroadcastHttpError(error);
                    reject(error);
                });
        });
    }

    public httpPostFileUpload(sevConfig: any, path: string, body: any, headerValue: any) {
        return new Promise((resolve, reject) => {
            const header = new HttpHeaders();
            const httpHeaders = this.setHeader(header, headerValue, sevConfig);
            const apiPath = this.getApiPath(sevConfig);
            const url = apiPath + sevConfig.ROUTE_PATH + path;
            const formData: FormData = new FormData();
            for (const key in body) {
                formData.append(key, body[key]);
            }
            return this.httpClient.request('POST', url, {body: formData, headers: httpHeaders})
                .toPromise()
                .then((response: any) => {
                    resolve(response);
                })
                .catch(error => {
                    this.eventEmitterSev.onBroadcastHttpError(error);
                    reject(error);
                });
        });
    }

    private setHeader(header: any, headerValue: any, sevConfig: any) {
        // if (!this.gVariable.authentication.session_id) {
        if (!this.gVariable.authentication.access_token) {
           // header = header.set('UserSessionId', '')
        } else {
            switch (sevConfig.KEY) {
                case 'BANK_A_SEV':
                    // header = header.set('UserSessionId', this.gVariable.authentication.session_id);
                    header = header.set('Authorization', 'Bearer '+this.gVariable.authentication.access_token);
                    
                    break;
                default :
                    break;
            }
        }
        for (const key in (headerValue || {})) {
            header = header.set(key, headerValue[key]);
        }
        return header;
    }

    public analyzeResponse(response: any) {
        this.toastNot.showError(response.responseStatusDisplay);
    }

}
