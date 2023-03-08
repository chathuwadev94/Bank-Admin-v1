import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GlobalVariable} from '../../../../core/com-classes';
import {StaticConfig} from '../../../../core/configs';
import {CategoryService} from '../../../../api-services/internal';
import {ToastService} from '../../../../core/services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-category-set-status',
    templateUrl: './category-set-status.component.html',
    styleUrls: ['./category-set-status.component.scss']
})
export class CategorySetStatusComponent implements OnInit {
    private action: string;
    public onClose: Subject<boolean>;
    public categoryDetail: any = {};
    public statusList = [];
    public statusObj = {
        id: null
    };
    public spinner: boolean;

    constructor(public bsModalRef: BsModalRef, private bsModalSev: BsModalService, private gVariable: GlobalVariable,
                private categoryService: CategoryService, private toastService: ToastService) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            this.getStatus(this.categoryDetail.status);
        });
    }

    onCloseModal(response: any) {
        if (response) {
            const obj: any = {
                action: this.action,
                data: response
            };
            this.onClose.next(obj);
        }
        this.bsModalRef.hide();
    }

    onSubmit() {
        const req = {
            'primary_id': this.categoryDetail._id,
            'status': Number(this.statusObj.id),
            'sessionId': this.gVariable.authentication.session_id
        };
        this.categoryService.setStatus(req).then((res: any) => {
            this.onCloseModal(req);
            this.toastService.showSuccess('Successfully updated.');
        });
    }

    private getStatus(value: any) {
        switch (value) {
            case StaticConfig.STATUS_LIST.PUBLISHED.ID:
                this.statusList = [{key: StaticConfig.STATUS_LIST.HALTED.ID, value: StaticConfig.STATUS_LIST.HALTED.NAME}];
                break;
            case StaticConfig.STATUS_LIST.HALTED.ID:
                this.statusList = [{key: StaticConfig.STATUS_LIST.PUBLISHED.ID, value: StaticConfig.STATUS_LIST.PUBLISHED.NAME}];
                break;
            default:
                this.statusList = [{key: StaticConfig.STATUS_LIST.PUBLISHED.ID, value: StaticConfig.STATUS_LIST.PUBLISHED.NAME},
                    {key: StaticConfig.STATUS_LIST.HALTED.ID, value: StaticConfig.STATUS_LIST.HALTED.NAME}];
                break;
        }
    }
}
