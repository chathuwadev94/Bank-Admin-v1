import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GlobalVariable} from '../../../../core/com-classes';
import {GlobalService} from '../../../../core/services';
import {Router} from '@angular/router';
import {StaticConfig} from '../../../../core/configs';
import {UserService} from '../../../../api-services/internal';
import {AdminUserDetailsComponent} from '../admin-user-details/admin-user-details.component';
import {AdminUserCreateComponent} from '../admin-user-create/admin-user-create.component';
import {SetStatusComponent} from '../set-status/set-status.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { AdminUserRemoveComponent } from '../admin-user-remove/admin-user-remove.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    bsModalRef: BsModalRef;
    public onClose: Subject<boolean>;
    public gridOnChangeTime = new Date().getTime();
    public gridEvent: any = {};
    public gridConfig: any = {};
    private action: string;
    private userDetail: any = {};
    private role:any;
    public roleObj:any={};

    constructor(private gVariable: GlobalVariable, private userService: UserService, private modalService: BsModalService) {
                    this.roleObj=[];
                    this.role=this.gVariable.authentication.user_detail.role;
    }

    ngOnInit() {
        this.initUserGridConfig();
    }

    onClickAddBtn() {
        this.action = 'add_user';
        this.userDetail = {};
        this.openUserModal();
    }

    onGridActionEvent($event) {
        switch ($event.action) {
            case 'view': {
                this.action = 'view_user';
                this.userDetail = $event.record;
                this.openUserDetailModal();
                break;
            }
            case 'edit': {
                this.action = 'edit_user';
                this.userDetail = $event.record;
                this.openUserModal();
                break;
            }
            case 'status': {
                this.action = 'status';
                this.userDetail = $event.record;
                this.openStatusModal();
                break;
            }
            case 'remove': {
                this.action = 'remove';
                this.userDetail = $event.record;
                this.openRemoveModal();
                break;
            }
            default: {
                break;
            }
        }
    }

    private initUserGridConfig() {
        const accessRoleFilterOptions = [
            {key: StaticConfig.ACCESS_TYPE.ADMIN.ID, value: StaticConfig.ACCESS_TYPE.ADMIN.NAME},
            {key: StaticConfig.ACCESS_TYPE.MANAGER.ID, value: StaticConfig.ACCESS_TYPE.MANAGER.NAME},
            {key: StaticConfig.ACCESS_TYPE.USER.ID, value: StaticConfig.ACCESS_TYPE.USER.NAME},
            {key: StaticConfig.ACCESS_TYPE.HOALD.ID, value: StaticConfig.ACCESS_TYPE.HOALD.NAME}
        ];
        const accessRoleDisplayCondition = [];
        Object.keys(StaticConfig.ACCESS_TYPE).map(key => {
            accessRoleDisplayCondition.push({
                key: StaticConfig.ACCESS_TYPE[key].ID,
                value: StaticConfig.ACCESS_TYPE[key].NAME,
                style: {color: StaticConfig.ACCESS_TYPE[key].COLOR}
            });
        });

        accessRoleDisplayCondition.forEach(key=>{
            if(key.key == this.role){
               this.roleObj[key.value]=key.value
                }
        });


        this.gridConfig = {
            'apiSev': this.userService,
            'sevFunction': 'findUserByQuerys',
            'apiParameters': {},
            'searchParameters': [],
            'primaryKey': 'id',
            'pagination': {
                'maxSize': StaticConfig.PAGINATION.MAX_SIZE,
                'itemsPerPage': StaticConfig.PAGINATION.ITEMS_PER_PAGE,
            },
            'waitingHttpSve': false,
            'columns': [],
            'elsxBtn': true,
            'printBtn': true,
            'tableName': 'Users',
            'records': [],
            'orderBy': {
                'key': 'firstName',
                'value': 'asc'  // 'asc' 'desc
            }
        };
        this.gridConfig.columns.push({
            'name': 'First Name',
            'key': 'firstName',
            'sort': true,
            'columnType': 'data',
            'headerClass': 'text-left',
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text',
            },
            // 'dataStyle': {'text-align': 'left'},
        });
        this.gridConfig.columns.push({
            'name': 'Last Name',
            'key': 'lastName',
            'sort': true,
            'columnType': 'data',
            'headerClass': 'text-left',
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text',
            }
        });
        this.gridConfig.columns.push({
            'name': 'Address',
            'key': 'address',
            'sort': true,
            'columnType': 'data',
            'headerClass': 'text-left',
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text',
            }
        });
        this.gridConfig.columns.push({
            'name': 'NIC',
            'key': 'NIC',
            'sort': true,
            'columnType': 'data',
            'headerClass': 'text-left',
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text',
            }
        });
        this.gridConfig.columns.push({
            'name': 'Email',
            'key': 'email',
            'sort': true,
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text',
            },
            'columnType': 'data',
            'headerClass': 'text-left'

        });
        this.gridConfig.columns.push({
            'name': 'Mobile',
            'key': 'mobile',
            'sort': true,
            'columnType': 'data',
            'headerClass': 'text-left',
            // 'dataStyle': {'text-align': 'left'},
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text',
            },
            'dataDisplayCondition': [{key: '', value: 'N/A'}]
        });
       
        this.gridConfig.columns.push({
            'name': 'Role',
            'key': 'role',
            'headerClass': 'text-center',
            'sort': true,
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'not_eq': true
                },
                'defaultOperator': 'eq',
                'type': 'option',
                'options': accessRoleFilterOptions
            },
            'dataDisplayCondition': accessRoleDisplayCondition,
            'dataType': 'number',
            'dataStyle': {'text-align': 'center'}
        });
        this.gridConfig.columns.push({
            'columnType': 'button',
            'buttonConfig': {
                'action': 'menu',
                'name': 'Menu',
                'class': 'btn-primary',
                'icon': 'far fa-hand-point-right',
                'type': 'menu',
                'menus': [
                    {'action': 'view', 'name': 'View', 'icon': 'fa fa-eye', 'style': {color: 'black'},'accessRole':(this.roleObj.ADMIN||this.roleObj.MANAGER)},
                    {'action': 'edit', 'name': 'Edit', 'icon': 'fa fa-edit', 'style': {color: 'black'},'accessRole':(this.roleObj.ADMIN||this.roleObj.MANAGER)},
                    {'action': 'status', 'name': 'Set Role', 'icon': 'fa fa-random', 'style': {color: 'black'},'accessRole': this.roleObj.ADMIN},
                    {'action': 'remove', 'name': 'Remove User', 'icon': 'fa fa-remove', 'style': {color: 'red'},'accessRole':this.roleObj.ADMIN}
                ]
            },
            'width': 35
        });
    }
  

    private onCallGridEven(event: string, data: any) {
        this.gridOnChangeTime = new Date().getTime();
        this.gridEvent.event = event;
        this.gridEvent.data = data;
    }

    private openStatusModal() {
        const modalConfig: any = {
            class: 'modal-s background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(SetStatusComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.userObj = Object.assign({}, this.userDetail || {});
        this.bsModalRef.content.onClose.subscribe(response => {
            if (response.data) {
                const data = {
                    'id': response.data.id,
                    'role': response.data.role,
                };
                this.onCallGridEven('edit', data);
            }
        });
    }

    private openUserModal() {
        const modalConfig: any = {
            class: 'modal-lg background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(AdminUserCreateComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.userDetail = Object.assign({}, this.userDetail || {});
        this.bsModalRef.content.onClose.subscribe(response => {
            if (response.data) {
                if (response.action === 'add_user') {
                    this.onCallGridEven('add', response.data);
                } else if (response.action === 'edit_user') {
                    this.onCallGridEven('edit', response.data);
                }
            }
        });
    }

    private openUserDetailModal() {
        const modalConfig: any = {
            class: 'modal-lg background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(AdminUserDetailsComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.userDetail = Object.assign({}, this.userDetail || {});
    }

    private openRemoveModal() {
        const modalConfig: any = {
            class: 'modal-s background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(AdminUserRemoveComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.userObj = Object.assign({}, this.userDetail || {});
        this.bsModalRef.content.onClose.subscribe(response => {
            if (response) {
                const data = {
                    'id': response.data.id,
                };
                this.onCallGridEven('delete', data);
            }
        });
    }

}
