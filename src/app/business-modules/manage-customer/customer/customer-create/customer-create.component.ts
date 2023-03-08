import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerService } from '../../../../api-services/internal/customer.service';
import { DatePipe } from '@angular/common';
import { ToastService, GlobalVariable, HttpService } from '../../../../core';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  public onClose: Subject<boolean>;
    public formGroup: FormGroup;
    public spinner = false;
    public customerObj: any;
    public genders = [];
    public countries: any = [];
    public action: string;

  constructor(public bsModalRef: BsModalRef, private bsModalSev: BsModalService, private formBuilder: FormBuilder,
    private customerService: CustomerService, private datePipe: DatePipe, private toastService: ToastService,
    private gVariable: GlobalVariable, private _cdr: ChangeDetectorRef, private httpService: HttpService) {
      this.onClose = new Subject();
     }

  ngOnInit() {

    this.genders = [{value: 'M', key: 'Male'}, {value: 'F', key: 'Female'}];
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      middleName: [''],
      lastName: ['', Validators.compose([Validators.required])],
      gender: [null,Validators.compose([Validators.required])],
      address: ['',Validators.compose([Validators.required])],
      NIC: ['',Validators.compose([Validators.required])],
      mobileNo: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      contactNo: [''],
      email: ['', Validators.compose([ Validators.email])],
      profession: [''],
      professionAddress: [''],
      professionContact: [''],
      spouseName:[''],
      spouseNIC:[''],
      spouseContactNo:[''],
      spouseProfession:['']
    });
    setTimeout(() => {
        if (this.action === 'edit_customer') {
            this.formGroup.patchValue(this.customerObj);
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

onSubmit(){

  for(let i in this.formGroup.controls){
    this.formGroup.controls[i].markAsTouched();
  }
  if(this.formGroup.valid){
    this.saveCustomer(this.formGroup.value);
  }

}

saveCustomer(value:any){
  this.spinner = true;
  let req={
    "firstName":value.firstName,
    "middleName":value.middleName || '',
    "lastName":value.lastName,
    "gender":value.gender,
    "address":value.address,
    "NIC":value.NIC,
    "mobileNo":value.mobileNo,
    "contactNo":value.contactNo || '',
    "email":value.email || '',
    "profession":value.profession || '',
    "professionAddress":value.professionAddress || '',
    "professionContact":value.professionContact || '',
    "spouseName":value.spouseName || '',
    "spouseNIC":value.spouseNIC || '',
    "spouseContactNo":value.spouseContactNo || '',
    "spouseProfession": value.spouseProfession || ''

  }
  if(this.action==='add_customer'){
       this.customerService.createCustomer(req).then((res:any)=>{
          if(res){
            this.spinner=false;
            this.onCloseModal(res);
            this.formGroup.reset();
          }
    
       }).catch(err=>{
        this.spinner = false;
       })
  }
  if(this.action==='edit_customer'){
    req['custId']=this.customerObj.custId;
    this.customerService.updateCustomer(req).then((res:any)=>{
      if(res){
        this.spinner=false;
        this.onCloseModal(res);
        this.formGroup.reset();
      }

    }).catch(err=>{
      this.spinner=false;
    });

  }
}

}
