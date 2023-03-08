import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {navigation,FunctionConfig} from '../configs';
import {GlobalVariable} from '../com-classes';
import {GuardService} from './guard.service';

@Injectable()
export class GlobalService {

    private navigation: any = navigation || [];

    constructor(private gVariable: GlobalVariable,
                private guardSev: GuardService,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    }

    public loadWebStorage() {
    }

    public getAvailableFunction(functionKeyList:any){
        const functionConfig = FunctionConfig.FUNCTIONS || {};
        const functionIdList= this.gVariable.authentication.user_detail.role.toString();
        const functionsMap: any = {};
        functionsMap.AT_LEAST_ONE = false;
        (functionKeyList || []).forEach((funcKey: any) => {
            functionsMap[funcKey] = functionIdList.indexOf(functionConfig[funcKey].ID) > -1;
            functionsMap.AT_LEAST_ONE = functionsMap[funcKey] ? true : functionsMap.AT_LEAST_ONE;
          });
          return functionsMap;

    }

    public setAvailableMenuList() {
        const menuList: any = [];
        let childrenMenuList: any = [];
        const nav = this.navigation.map(x => Object.assign({}, x));
        nav.forEach((obj: any) => {
            if (obj.menu) {
                if (obj.children) {
                    childrenMenuList = [];
                    obj.children.forEach((childrenObj: any) => {
                        if (childrenObj) {
                            if(this.getAvailableFunction(childrenObj.functions).AT_LEAST_ONE){
                                childrenMenuList.push(Object.assign(childrenObj));
                            }
                        }
                    });
                    if (childrenMenuList.length > 0) {
                        obj.children = childrenMenuList;
                        menuList.push(Object.assign(obj));
                    }
                } else {
                    if (obj) {
                        if(this.getAvailableFunction(obj.functions).AT_LEAST_ONE){
                            menuList.push(Object.assign(obj));
                        }
                    }
                }
            } else {
                // individual menu item
                menuList.push(Object.assign(obj));
            }
        });
        this.gVariable.navigationMenu = menuList;
    }

}
