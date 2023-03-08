import { Pipe, PipeTransform } from '@angular/core';
import {StaticConfig} from '../../core/configs';

@Pipe({
  name: 'checkStatus'
})
export class CheckStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {


      let statusList = {};
      Object.keys(StaticConfig.STATUS_LIST).map(key => {
          if (!StaticConfig.STATUS_LIST[key].ID === value) {
              statusList = {
                  id: StaticConfig.STATUS_LIST[key].ID,
                  name: StaticConfig.STATUS_LIST[key].NAME
              };
          }
      });
    return statusList;
  }

}
