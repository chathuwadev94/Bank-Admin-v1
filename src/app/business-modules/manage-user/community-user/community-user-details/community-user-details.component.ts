import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {StaticConfig} from '../../../../core/configs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-community-user-details',
  templateUrl: './community-user-details.component.html',
  styleUrls: ['./community-user-details.component.scss']
})
export class CommunityUserDetailsComponent implements OnInit {

    public action: any;
    public communityUserObj: any = {};
    public onClose: Subject<boolean>;

    constructor(private bsModalRef: BsModalRef, private datePipe: DatePipe) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.communityUserObj.created_date) {
                const newCreatedDate = new Date(this.communityUserObj.created_date);
                this.communityUserObj.created_date = this.datePipe.transform(newCreatedDate,
                    StaticConfig.DATE_TYPES.DATE_TIME_WITHOUT_SS);
            }
        });
    }

    onCloseModal() {
        this.bsModalRef.hide();
    }
}
