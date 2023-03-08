import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {StaticConfig} from '../../../../core/configs';
import {GlobalVariable} from '../../../../core/com-classes';
import {UserService} from '../../../../api-services/internal';
import {NgForm} from '@angular/forms';
import {ToastService} from '../../../../core/services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
    selector: 'app-set-status',
    templateUrl: './set-status.component.html',
    styleUrls: ['./set-status.component.scss']
})
export class SetStatusComponent implements OnInit {

    private action: string;
    public onClose: Subject<boolean>;
    public userObj: any = {};
    public rolesList = [];
    public roleObj = {
        id: null
    };
    public spinner: boolean;

    constructor(public bsModalRef: BsModalRef, private bsModalSev: BsModalService, private gVariable: GlobalVariable,
                private userSev: UserService, private toastService: ToastService) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            const accessRoleDisplayCondition = [];
            Object.keys(StaticConfig.ACCESS_TYPE).map(key => {
                accessRoleDisplayCondition.push({
                    key: StaticConfig.ACCESS_TYPE[key].ID,
                    value: StaticConfig.ACCESS_TYPE[key].NAME,
                    style: {color: StaticConfig.ACCESS_TYPE[key].COLOR}
                });
            });
            this.rolesList=accessRoleDisplayCondition;
            this.roleObj.id=this.userObj.role;
        },500);
        
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

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.spinner = true;
            const req = {
                'id': this.userObj.id,
                'role': Number(this.roleObj.id),
            };
            this.userSev.changeRole(req).then((res: any) => {
                this.toastService.showSuccess('Successfully updated.');
                this.onCloseModal(req);
                this.spinner = false;
            }).catch(error => {
                this.spinner = false;
            });
        }
    }

   
}
