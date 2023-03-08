import { Pipe, PipeTransform } from '@angular/core';
import {StaticConfig} from '../../core/configs';

@Pipe({
  name: 'domainConfig'
})
export class DomainConficPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

      let domainName = 'N/A';
      Object.keys(StaticConfig.DOMAIN).map(key => {
          if (StaticConfig.DOMAIN[key].ID === value) {
              domainName = StaticConfig.DOMAIN[key].NAME;
          }
      });
      return domainName;
  }

}
