import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {GlobalVariable} from '../../../../core/com-classes';
import {GlobalService} from '../../../../core/services';
import {Router} from '@angular/router';
import {UserService} from '../../../../api-services/internal';
import {StaticConfig} from '../../../../core/configs';
import {CommunityUserDetailsComponent} from '../community-user-details/community-user-details.component';
import {ComUserSetStatusComponent} from '../com-user-set-status/com-user-set-status.component';

@Component({
  selector: 'app-community-user-list',
  templateUrl: './community-user-list.component.html',
  styleUrls: ['./community-user-list.component.scss']
})
export class CommunityUserListComponent implements OnInit {

    bsModalRef: BsModalRef;
    public onClose: Subject<boolean>;
    public gridOnChangeTime = new Date().getTime();
    public gridEvent: any = {};
    public gridConfig: any = {};
    private action: string;
    private userDetail: any = {};

    constructor(private gVariable: GlobalVariable, private gSev: GlobalService, private router: Router,
                private userService: UserService, private modalService: BsModalService) {
    }

    ngOnInit() {
        this.initUserGridConfig();
    }

    onGridActionEvent($event) {
        switch ($event.action) {
            case 'view': {
                this.action = 'view_user';
                this.userDetail = $event.record;
                this.openUserDetailModal();
                break;
            }
            case 'status': {
                this.action = 'status';
                this.userDetail = $event.record;
                this.openStatusModal();
                break;
            }
            default: {
                break;
            }
        }
    }

    private initUserGridConfig() {
        const statusFilterOptions = [
            {key: StaticConfig.STATUS_LIST.ADDED.ID, value: StaticConfig.STATUS_LIST.ADDED.NAME},
            {key: StaticConfig.STATUS_LIST.PUBLISHED.ID, value: StaticConfig.STATUS_LIST.PUBLISHED.NAME},
            {key: StaticConfig.STATUS_LIST.HALTED.ID, value: StaticConfig.STATUS_LIST.HALTED.NAME},
        ];
        const statusDisplayCondition = [];
        Object.keys(StaticConfig.STATUS_LIST).map(key => {
            statusDisplayCondition.push({
                key: StaticConfig.STATUS_LIST[key].ID,
                value: StaticConfig.STATUS_LIST[key].NAME,
                style: {color: StaticConfig.STATUS_LIST[key].COLOR}
            });
        });
        this.gridConfig = {
            'apiSev': this.userService,
            'sevFunction': 'findCommunityUserByQuery',
            'apiParameters': {},
            'searchParameters': [],
            'primaryKey': '_id',
            'pagination': {
                'maxSize': StaticConfig.PAGINATION.MAX_SIZE,
                'itemsPerPage': StaticConfig.PAGINATION.ITEMS_PER_PAGE,
            },
            'waitingHttpSve': false,
            'columns': [],
            'elsxBtn': true,
            'printBtn': true,
            'tableName': 'Community Users',
            'records': [],
            'orderBy': {
                'key': 'username',
                'value': 'asc'  // 'asc' 'desc
            }
        };
        this.gridConfig.columns.push({
            'name': 'UserName',
            'key': 'username',
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
            'name': 'FullName',
            'key': 'first_name',
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
            'name': 'Email Confirmed',
            'key': 'email_confirmed',
            'sort': true,
            'filter': false,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text',
            },
            'columnType': 'data',
            'headerClass': 'text-left',
            'dataStyle': {'text-align': 'center'},
            'dataDisplayCondition': [{key: true, value: 'Yes'}, {key: false, value: 'No'}]
        });
        this.gridConfig.columns.push({
            'name': 'Mobile',
            'key': 'mobile',
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
            'dataDisplayCondition': [{key: '', value: 'N/A'}]
        });
        this.gridConfig.columns.push({
            'name': 'Chanel',
            'key': 'channel',
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
            'name': 'Country',
            'key': 'country',
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
            'dataDisplayCondition': [{key: '', value: 'N/A'}, {key: null, value: 'N/A'}]
        });
        this.gridConfig.columns.push({
            'name': 'Status',
            'key': 'status',
            'headerClass': 'text-center',
            'filter': true,
            'sort': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'not_eq': true
                },
                'defaultOperator': 'eq',
                'type': 'option',
                'options': statusFilterOptions
            },
            'dataDisplayCondition': statusDisplayCondition,
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
                    {'action': 'view', 'name': 'View', 'icon': 'fa fa-eye', 'style': {color: 'black'}},
                    {'action': 'status', 'name': 'Set Status', 'icon': 'fa fa-random', 'style': {color: 'black'}}
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
        this.bsModalRef = this.modalService.show(ComUserSetStatusComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.userDetail = Object.assign({}, this.userDetail || {});
        this.bsModalRef.content.onClose.subscribe(response => {
            if (response.data) {
                const data = {
                    '_id': response.data.primary_id,
                    'status': response.data.status,
                };
                this.onCallGridEven('edit', data);
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
        this.bsModalRef = this.modalService.show(CommunityUserDetailsComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.communityUserObj = Object.assign({}, this.userDetail || {});
    }

}
