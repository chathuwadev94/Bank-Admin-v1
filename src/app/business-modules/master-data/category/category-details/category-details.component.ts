import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {StaticConfig} from '../../../../core/configs';
import {DatePipe} from '@angular/common';
import {GlobalVariable} from '../../../../core/com-classes';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

    public action: any;
    public categoryObj: any = {};
    public onClose: Subject<boolean>;

    constructor(private bsModalRef: BsModalRef, private datePipe: DatePipe, private gVariable: GlobalVariable) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.categoryObj.created_date) {
                const newCreatedDate = new Date(this.categoryObj.created_date);
                this.categoryObj.created_date = this.datePipe.transform(newCreatedDate, StaticConfig.DATE_TYPES.DATE_TIME_WITHOUT_SS);
            }
            if (this.categoryObj.icon) {
                this.categoryObj.icon = this.gVariable.appConfig.IMAGE_URL + this.categoryObj.icon;
            }
        });
    }

    onCloseModal() {
        this.bsModalRef.hide();
    }
}
