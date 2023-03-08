import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GlobalVariable} from '../../../../core/com-classes';
import {GlobalService} from '../../../../core/services';
import {Router} from '@angular/router';
import {UserService, SubCategoryService} from '../../../../api-services/internal';
import {StaticConfig} from '../../../../core/configs';
import {SubCategorySetStatusComponent} from '../sub-category-set-status/sub-category-set-status.component';
import {SubCategoryCreateComponent} from '../sub-category-create/sub-category-create.component';
import {SubCategoryDetailsComponent} from '../sub-category-details/sub-category-details.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-sub-category-list',
    templateUrl: './sub-category-list.component.html',
    styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

    bsModalRef: BsModalRef;
    public onClose: Subject<boolean>;
    public gridOnChangeTime = new Date().getTime();
    public gridEvent: any = {};
    public gridConfig: any = {};
    private action: string;
    private subCategoryObj: any = {};

    constructor(private gVariable: GlobalVariable, private gSev: GlobalService, private router: Router,
                private userService: UserService, private modalService: BsModalService, private subCategorySev: SubCategoryService) {
    }

    ngOnInit() {
        this.initUserGridConfig();
    }

    onClickAddBtn() {
        this.action = 'add_sub_category';
        this.subCategoryObj = {};
        this.openSubCategoryModal();
    }

    onGridActionEvent($event) {
        switch ($event.action) {
            case 'view': {
                this.action = 'view_sub_category';
                this.subCategoryObj = $event.record;
                this.openSubCategoryDetailModal();
                break;
            }
            case 'edit': {
                this.action = 'edit_sub_category';
                this.subCategoryObj = $event.record;
                this.openSubCategoryModal();
                break;
            }
            case 'status': {
                this.action = 'status';
                this.subCategoryObj = $event.record;
                this.openSubCategoryStatusModal();
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
        const domainFilterOptions = [
            {key: StaticConfig.DOMAIN.HOTEL.ID, value: StaticConfig.DOMAIN.HOTEL.NAME},
            {key: StaticConfig.DOMAIN.TRANSPORT.ID, value: StaticConfig.DOMAIN.TRANSPORT.NAME},
            {key: StaticConfig.DOMAIN.TOUR.ID, value: StaticConfig.DOMAIN.TOUR.NAME},
        ];
        const domainDisplayCondition = [];
        Object.keys(StaticConfig.DOMAIN).map(key => {
            domainDisplayCondition.push({
                key: StaticConfig.DOMAIN[key].ID,
                value: StaticConfig.DOMAIN[key].NAME,
                style: {color: StaticConfig.DOMAIN[key].COLOR}
            });
        });
        this.gridConfig = {
            'apiSev': this.subCategorySev,
            'sevFunction': 'findSubCategoryByQuery',
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
            'tableName': 'Users',
            'records': [],
            'orderBy': {
                'key': 'name',
                'value': 'asc'  // 'asc' 'desc
            }
        };
        this.gridConfig.columns.push({
            'name': 'Name',
            'key': 'name',
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
            'name': 'Domain',
            'key': 'domain_id',
            'headerClass': 'text-center',
            'sort': true,
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                },
                'defaultOperator': 'eq',
                'type': 'option',
                'options': domainFilterOptions
            },
            'dataDisplayCondition': domainDisplayCondition,
            'dataType': 'number',
            'dataStyle': {'text-align': 'center'}
        });
        this.gridConfig.columns.push({
            'name': 'Category',
            'key': 'category_id',
            'headerClass': 'text-center',
            'filter': true,
            'filterConfig': {
                'operators': {
                    'eq': true,
                    'like': true
                },
                'defaultOperator': 'like',
                'type': 'text'
            },
            'dataType': 'number',
            'dataStyle': {'text-align': 'center'},
            'width': 150
        });
        this.gridConfig.columns.push({
            'name': 'Description',
            'key': 'description',
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
            'name': 'Status',
            'key': 'status',
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
                'options': statusFilterOptions
            },
            'dataDisplayCondition': statusDisplayCondition,
            'dataType': 'number',
            'dataStyle': {'text-align': 'center'},
            'width': 150
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
                    {'action': 'edit', 'name': 'Edit', 'icon': 'fa fa-edit', 'style': {color: 'black'}},
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

    private openSubCategoryStatusModal() {
        const modalConfig: any = {
            class: 'modal-s background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(SubCategorySetStatusComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.subCategoryObj = Object.assign({}, this.subCategoryObj || {});
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

    private openSubCategoryModal() {
        const modalConfig: any = {
            class: 'modal-lg background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(SubCategoryCreateComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.subCategoryObj = Object.assign({}, this.subCategoryObj || {});
        this.bsModalRef.content.onClose.subscribe(response => {
            if (response.data) {
                if (response.action === 'add_sub_category') {
                    this.onCallGridEven('add', response.data);
                } else if (response.action === 'edit_sub_category') {
                    this.onCallGridEven('edit', response.data);
                }
            }
        });
    }

    private openSubCategoryDetailModal() {
        const modalConfig: any = {
            class: 'modal-lg background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(SubCategoryDetailsComponent, modalConfig);
        this.bsModalRef.content.action = this.action;
        this.bsModalRef.content.subCategoryObj = Object.assign({}, this.subCategoryObj || {});
    }
}
