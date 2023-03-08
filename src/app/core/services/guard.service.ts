import {Inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { StaticConfig } from '../configs';

import {GlobalVariable} from '../com-classes';

@Injectable()
export class GuardService implements CanActivate {
  constructor(private router: Router,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private gVariable: GlobalVariable) {
  }

  public canActivate() {
    try {
      const authentication = this.storage.get(StaticConfig.STORAGE_KEY.AUTHENTICATION_PK);
      if (authentication !== null ) {
        this.gVariable.authentication = authentication;
        return true;
      } else {
        this.removeAuthentication();
        return false;
      }
    } catch (e) {
      this.removeAuthentication();
      return false;
    }
  }

  public createAuthentication(value: any) {
    this.storage.remove(StaticConfig.STORAGE_KEY.AUTHENTICATION_PK);
    this.gVariable.authentication = {};
    this.gVariable.navigationMenu = {};
    value.authorized = true;
    this.storage.set(StaticConfig.STORAGE_KEY.AUTHENTICATION_PK, value);
    this.canActivate();
  }

  public removeAuthentication() {
    this.storage.remove(StaticConfig.STORAGE_KEY.AUTHENTICATION_PK);
    this.gVariable.authentication = {};
    this.router.navigate(['/login']).then();
  }

}
