import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, NgForm} from '@angular/forms';
import {ToastService} from '../../../../core/services';
import {GlobalVariable} from '../../../../core/com-classes';
import {StaticConfig} from '../../../../core/configs';
import {CategoryService} from '../../../../api-services/internal';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
    public onClose: Subject<boolean>;
    public action: string;
    public spinner: boolean;
    public domainList: any = [];
    public categoryObj: any = {};
    public fileUploadCategoryConfig: any = {};

    constructor(public bsModalRef: BsModalRef, private bsModalSev: BsModalService, private formBuilder: FormBuilder,
                private toastService: ToastService, private gVariable: GlobalVariable, private categorySev: CategoryService) {
        this.onClose = new Subject();
    }

    ngOnInit() {
        setTimeout(() => {
            this.getDomain();
            this.fileUploadCategoryConfig = {
                'Header': 'Category',
                'width': 50,
                'height': 50,
                'ratio': 1,
                'imgUrl': this.gVariable.appConfig.IMAGE_URL,
                'image': this.categoryObj.icon,
            };
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

    onCategoryUpload($event) {
        switch ($event.type) {
            case 'uploaded': {
                this.categoryObj.icon = $event.data;
                break;
            }
            case 'deleted': {
                this.categoryObj.icon = null;
                break;
            }
            case 'error': {
                this.categoryObj.icon = null;
                break;
            }
            default: {
                this.categoryObj.icon = null;
                break;
            }
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
            'name': this.categoryObj.name,
            'domain_id': this.categoryObj.domain_id,
            'description': this.categoryObj.description,
            'icon': this.categoryObj.icon,
            'session_id': sessionId,
            'created_date': '',
            'status': 0
        };
        if (this.action === 'add_category') {
            this.categorySev.createCategory(req).then((res: any) => {
                this.toastService.showSuccess('Category added successfully.');
                this.spinner = false;
                this.onCloseModal(res);
            }).catch(error => {
                this.spinner = false;
            });
        } else if (this.action === 'edit_category') {
            req._id = this.categoryObj._id;
            req.status = this.categoryObj.status;
            this.categorySev.updateCategory(req).then((res: any) => {
                this.toastService.showSuccess('Category updated successfully.');
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
        if (this.action === 'add_category') {
            this.categoryObj.domain_id = null;
        }
    }
}
