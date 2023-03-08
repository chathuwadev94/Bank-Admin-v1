import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';
import {ToastService} from '../../../../core/services';
import {GlobalVariable} from '../../../../core/com-classes';
import {CategoryService, SubCategoryService} from '../../../../api-services/internal';
import {StaticConfig} from '../../../../core/configs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-sub-category-create',
    templateUrl: './sub-category-create.component.html',
    styleUrls: ['./sub-category-create.component.scss']
})
export class SubCategoryCreateComponent implements OnInit {

    public onClose: Subject<boolean>;
    public action: string;
    public domainList: any = [];
    public categoryList: any = [];
    public subCategoryObj: any = {};
    public spinner: boolean;
    public categorySpinner: boolean;
    public fileUploadSubCategoryConfig: any = {};

    constructor(public bsModalRef: BsModalRef, private bsModalSev: BsModalService, private toastService: ToastService,
                private gVariable: GlobalVariable, private categorySev: CategoryService, private subCategorySev: SubCategoryService) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            this.subCategoryObj.category_id = null;
            this.getDomain();
            this.fileUploadSubCategoryConfig = {
                'Header': 'Sub Category',
                'width': 50,
                'height': 50,
                'ratio': 1,
                'imgUrl': this.gVariable.appConfig.IMAGE_URL,
                'image': this.subCategoryObj.icon,
            };
            if (this.action === 'edit_sub_category') {
                this.getCategoryByDomain(this.subCategoryObj.domain_id);
            }
        }, 0);
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

    onSubCategoryUpload($event) {
        switch ($event.type) {
            case 'uploaded': {
                this.subCategoryObj.icon = $event.data;
                break;
            }
            case 'deleted': {
                this.subCategoryObj.icon = null;
                break;
            }
            case 'error': {
                this.subCategoryObj.icon = null;
                break;
            }
            default: {
                this.subCategoryObj.icon = null;
                break;
            }
        }
    }

    onChangeDomain() {
        if (this.subCategoryObj.domain_id) {
            this.getCategoryByDomain(this.subCategoryObj.domain_id);
        }
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.saveCategory();
        }
    }

    private saveCategory() {
        this.spinner = true;
        const sessionId = this.gVariable.authentication.session_id;
        const req = {
            '_id': 0,
            'name': this.subCategoryObj.name,
            'domain_id': this.subCategoryObj.domain_id,
            'category_id': this.subCategoryObj.category_id,
            'description': this.subCategoryObj.description,
            'icon': this.subCategoryObj.icon,
            'session_id': sessionId,
            'created_date': '',
            'status': 0
        };
        if (this.action === 'add_sub_category') {
            this.subCategorySev.createSubCategory(req).then((res: any) => {
                this.toastService.showSuccess('Sub Category added successfully.');
                this.spinner = false;
                this.onCloseModal(res);
            }).catch(error => {
                this.spinner = false;
            });
        } else if (this.action === 'edit_sub_category') {
            req._id = this.subCategoryObj._id;
            req.status = this.subCategoryObj.status;
            this.subCategorySev.updateSubCategory(req).then((res: any) => {
                this.toastService.showSuccess('Sub Category updated successfully.');
                this.spinner = false;
                this.onCloseModal(res);
            }).catch(error => {
                this.spinner = false;
            });
        }
    }

    private getDomain() {
        Object.keys(StaticConfig.DOMAIN).map(key => {
            this.domainList.push({
                key: StaticConfig.DOMAIN[key].ID,
                value: StaticConfig.DOMAIN[key].NAME,
            });
        });
        if (this.action === 'add_sub_category') {
            this.subCategoryObj.domain_id = null;
        }
    }

    private getCategoryByDomain(domainId: number) {
        this.subCategoryObj.category_id = null;
        this.categorySpinner = true;
        const qry: any = {status: 2, domain_id: domainId};
        const req: any = {
            'projection': '{"name":1}',
            'orderBy': '',
            'skip': 0,
            'limit': 0
        };
        req['query'] = JSON.stringify(qry);
        this.categorySev.findCategoryByQuery(req).then((res: any) => {
            this.categorySpinner = false;
            this.categoryList = res.data;
        }).catch(error => {
            this.categoryList = [];
            this.categorySpinner = false;
            this.subCategoryObj.category_id = null;
        });
    }
}
