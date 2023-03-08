import {Injectable} from '@angular/core';
// import Swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import {StaticConfig} from '../configs';

@Injectable()
export class SweetAlertService {
  constructor(private translate: TranslateService) {}

  public warning(titleStr: string, textStr: string) {
    // const promise = new Promise((resolve, reject) =>
    // Swal.fire({
    //   title: this.translate.instant(titleStr),
    //   text: this.translate.instant(textStr),
    //   icon: 'warning',
    //   width: StaticConfig.ALERT_CONFIG.width,
    //   showCancelButton: true,
    //   showCloseButton: true,
    //   confirmButtonColor: '#11c14b',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: this.translate.instant('Yes'),
    //   cancelButtonText: this.translate.instant('No'),
    // }).then((result) => {
    //   if (result.value) {
    //     resolve(result);
    //   }
    // }).catch((error: any) => {
    //   reject(error);
    // }));
    // return promise;
  }

  public successOk(title: string, textStr: string) {
    // const promise = new Promise((resolve, reject) =>
    //   Swal.fire({
    //     text: this.translate.instant(textStr),
    //     title: this.translate.instant(title),
    //     icon: 'success',
    //     width: StaticConfig.ALERT_CONFIG.width,
    //     confirmButtonColor: '#11c14b',
    //     showConfirmButton: true,
    //     confirmButtonText: this.translate.instant('Ok'),
    //   }).then((result) => {
    //     if (result.value) {
    //       resolve(result);
    //     }
    //   }).catch((error: any) => {
    //     reject(error);
    //   }));
    // return promise;
  }

}
