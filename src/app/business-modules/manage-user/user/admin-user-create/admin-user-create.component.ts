import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalVariable} from '../../../../core/com-classes';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpService, ToastService} from '../../../../core/services';
import {Subject} from 'rxjs';
import {UserService} from '../../../../api-services/internal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import * as sha256 from 'js-sha256';

@Component({
    selector: 'app-admin-user-create',
    templateUrl: './admin-user-create.component.html',
    styleUrls: ['./admin-user-create.component.scss']
})
export class AdminUserCreateComponent implements OnInit {

    public onClose: Subject<boolean>;
    public formGroup: FormGroup;
    public spinner = false;
    public userDetail: any;
    public genders = [];
    public countries: any = [];
    public action: string;

    constructor(public bsModalRef: BsModalRef, private bsModalSev: BsModalService, private formBuilder: FormBuilder,
                private systemUserSev: UserService, private datePipe: DatePipe, private toastService: ToastService,
                private gVariable: GlobalVariable, private _cdr: ChangeDetectorRef, private httpService: HttpService) {
        this.onClose = new Subject();

    }

    ngOnInit() {
        this.genders = [{value: 'M', key: 'Male'}, {value: 'F', key: 'Female'}];
        this.formGroup = this.formBuilder.group({
            firstName: ['', Validators.compose([Validators.required])],
            middleName: [''],
            lastName: ['', Validators.compose([Validators.required])],
            gender: [null],
            address: [null],
            NIC: ['',Validators.compose([Validators.required])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
            contact: ['', Validators.compose([Validators.pattern('^[0-9]*$')])],
            email: ['', Validators.compose([ Validators.email])],
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
            cPassword: ['', Validators.compose([Validators.required])]
        }, {
            validator: this.checkConfirmPassword()
        });
        setTimeout(() => {
            if (this.action === 'edit_user') {
                this.formGroup.controls['username'].disable();
                this.formGroup.controls['password'].disable();
                this.formGroup.controls['cPassword'].disable();
                this.formGroup.controls['username'].reset();
                this.formGroup.controls['password'].reset();
                this.formGroup.controls['cPassword'].reset();
                this.formGroup.patchValue(this.userDetail);
            }
        }, 0);
    }

    onCloseModal(response: any) {
        if (response) {
            const obj: any = {
                action: this.action,
                data: response.data[0]
            };
            this.onClose.next(obj);
        }
        this.bsModalRef.hide();
    }


    onSubmit() {
        for (const i in this.formGroup.controls) {
            this.formGroup.controls[i].markAsTouched();
        }
        if (this.formGroup.valid) {
            this.saveUser(this.formGroup.value);
        }
    }

    private saveUser(userDetails: any) {
        this.spinner = true;
        const sessionId = this.gVariable.authentication.session_id;
        const req = {
            'firstName': userDetails.firstName,
            'middleName': userDetails.middleName || '',
            'lastName': userDetails.lastName,
            'email': userDetails.email,
            'mobile': userDetails.mobile,
            'contact': userDetails.contact || '',
            'gender': userDetails.gender || '',
            'address': userDetails.address || '',
            'NIC': userDetails.NIC || '',
            'role':4
            
        };
        if (this.action === 'add_user') {
            req['username'] = userDetails.username;
            req['password'] = sha256.sha256(userDetails.password).toUpperCase();
            this.systemUserSev.createUser(req).then((res: any) => {
                this.toastService.showSuccess('User added successfully.');
                this.onCloseModal(res);
                this.spinner = false;
                this.formGroup.reset();
            }).catch(error => {
                this.spinner = false;
            });
        }
        if (this.action === 'edit_user') {
            req['id'] = this.userDetail.id;
            req['username'] = this.userDetail.username;
            req.role=this.userDetail.username.role;
            this.systemUserSev.updateUser(req).then((res: any) => {
                this.toastService.showSuccess('User updated successfully.');
                this.onCloseModal(res);
                this.spinner = false;
                this.formGroup.reset();
            }).catch(error => {
                this.spinner = false;
            });
        }
    }

    private checkConfirmPassword() {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls['password'];
            const matchingControl = formGroup.controls['cPassword'];
            if (matchingControl.value) {
                if (control.value !== matchingControl.value) {
                    matchingControl.setErrors({matchError: true});
                } else {
                    matchingControl.setErrors(null);
                }
            } else {
                matchingControl.setErrors({required: true});
            }
        };
    }

    private getCountry() {
        this.countries = [];
        const jsonFile = 'assets/countries.json';
        this.httpService.httpGetLocal(jsonFile).then((data: any) => {
            if (data) {
                this.countries = data;
            }
        }).catch((error: any) => {
        });
    }

}
