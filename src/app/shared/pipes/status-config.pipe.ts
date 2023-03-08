import {Pipe, PipeTransform} from '@angular/core';
import {StaticConfig} from '../../core/configs';

@Pipe({
    name: 'statusConfig'
})
export class StatusConfigPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        let statusName = 'N/A';
        Object.keys(StaticConfig.STATUS_LIST).map(key => {
            if (StaticConfig.STATUS_LIST[key].ID === value) {
                statusName = StaticConfig.STATUS_LIST[key].NAME;
            }
        });
        return statusName;
    }

}
