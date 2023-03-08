import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {StaticConfig} from '../../../../core/configs';
import {DatePipe} from '@angular/common';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-admin-user-details',
    templateUrl: './admin-user-details.component.html',
    styleUrls: ['./admin-user-details.component.scss']
})
export class AdminUserDetailsComponent implements OnInit {

    public action: any;
    public userDetail: any = {};
    public onClose: Subject<boolean>;

    constructor(private bsModalRef: BsModalRef, private datePipe: DatePipe) {
        this.onClose = new Subject();

    }

    ngOnInit() {
        setTimeout(() => {
            if (this.userDetail.created_date) {
                const newCreatedDate = new Date(this.userDetail.created_date);
                this.userDetail.created_date = this.datePipe.transform(newCreatedDate, StaticConfig.DATE_TYPES.DATE_TIME_WITHOUT_SS);
            }
        });
    }

    onCloseModal(response: any) {
        this.bsModalRef.hide();
    }

}
