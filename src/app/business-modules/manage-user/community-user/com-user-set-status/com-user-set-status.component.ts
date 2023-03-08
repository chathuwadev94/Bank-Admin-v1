import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {GlobalVariable} from '../../../../core/com-classes';
import {UserService} from '../../../../api-services/internal';
import {StaticConfig} from '../../../../core/configs';
import {NgForm} from '@angular/forms';
import {ToastService} from '../../../../core/services';

@Component({
    selector: 'app-com-user-set-status',
    templateUrl: './com-user-set-status.component.html',
    styleUrls: ['./com-user-set-status.component.scss']
})
export class ComUserSetStatusComponent implements OnInit {

    private action: string;
    public onClose: Subject<boolean>;
    public userObj: any = {};
    public statusList = [];
    public statusObj = {
        id: null
    };
    public spinner: boolean;

    constructor(public bsModalRef: BsModalRef, private bsModalSev: BsModalService, private gVariable: GlobalVariable,
                private userSev: UserService, private toastService: ToastService) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            this.getAdminUserDetails();
            this.getStatus(this.userObj.status);
        });
    }

    private getAdminUserDetails() {
        this.userObj = this.bsModalRef.content.userDetail;
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

    private getStatus(value: any) {
        switch (value) {
            case StaticConfig.STATUS_LIST.PUBLISHED.ID:
                this.statusList = [{key : StaticConfig.STATUS_LIST.HALTED.ID, value: StaticConfig.STATUS_LIST.HALTED.NAME}];
                break;
            case StaticConfig.STATUS_LIST.HALTED.ID:
                this.statusList = [{key : StaticConfig.STATUS_LIST.PUBLISHED.ID, value: StaticConfig.STATUS_LIST.PUBLISHED.NAME}];
                break;
            default:
                this.statusList = [{key : StaticConfig.STATUS_LIST.PUBLISHED.ID, value: StaticConfig.STATUS_LIST.PUBLISHED.NAME},
                    {key : StaticConfig.STATUS_LIST.HALTED.ID, value: StaticConfig.STATUS_LIST.HALTED.NAME}];
                break;
        }
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.spinner = true;
            const req = {
                'primary_id': this.userObj._id,
                'status': Number(this.statusObj.id),
                'sessionId': this.gVariable.authentication.session_id
            };
            this.userSev.setComUserStatus(req).then((res: any) => {
                this.toastService.showSuccess('Successfully updated.');
                this.onCloseModal(req);
                this.spinner = false;
            }).catch(error => {
                this.spinner = false;
            });
        }
    }
}
