import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {StaticConfig} from '../../../../core/configs';
import {DatePipe} from '@angular/common';
import {GlobalVariable} from '../../../../core/com-classes';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-sub-category-details',
    templateUrl: './sub-category-details.component.html',
    styleUrls: ['./sub-category-details.component.scss']
})
export class SubCategoryDetailsComponent implements OnInit {

    public action: any;
    public subCategoryObj: any = {};
    public onClose: Subject<boolean>;

    constructor(private bsModalRef: BsModalRef, private datePipe: DatePipe, private gVariable: GlobalVariable) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.subCategoryObj.created_date) {
                const newCreatedDate = new Date(this.subCategoryObj.created_date);
                this.subCategoryObj.created_date = this.datePipe.transform(newCreatedDate, StaticConfig.DATE_TYPES.DATE_TIME_WITHOUT_SS);
            }
            if (this.subCategoryObj.icon) {
                this.subCategoryObj.icon = this.gVariable.appConfig.IMAGE_URL + this.subCategoryObj.icon;
            }
        }, 0);
    }

    onCloseModal() {
        this.bsModalRef.hide();
    }
}
