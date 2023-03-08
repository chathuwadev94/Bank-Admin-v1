import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService, GlobalVariable, HttpService } from '../../../../core';
import { AccountTypeService } from '../../../../api-services/internal/account-type.service';

@Component({
  selector: 'app-create-account-type',
  templateUrl: './create-account-type.component.html',
  styleUrls: ['./create-account-type.component.scss']
})
export class CreateAccountTypeComponent implements OnInit {

  public onClose: Subject<boolean>;
  public formGroup: FormGroup;
  public spinner = false;
  public accTypes: any;
  public action: string;
  public accTypeObj:any;
  public AccTrTypes=[{key:"Credit",value:"CR"},{key:"Debit",value:"DR"}];

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder,private toastService: ToastService,
    private gVariable: GlobalVariable,private httpService: HttpService,private accountTypeServ:AccountTypeService) { 
      this.onClose = new Subject();
    }

  ngOnInit() {
   
        this.formGroup = this.formBuilder.group({
          name: ['', Validators.compose([Validators.required])],
          accTrType:[null,Validators.compose([Validators.required])]
        });
        setTimeout(() => {
          if (this.action === 'edit_accType') {
              this.formGroup.patchValue(this.accTypeObj);
          }
      }, 0);
  }

  onCloseModal(response: any) {
    if (response) {
        const obj: any = {
            action: this.action,
            data: response[0]
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
      this.saveAccountType(this.formGroup.value);
  }
}

public saveAccountType(value:any){
  console.log(value);
  this.spinner = true;
  let req={
    "name":value.name,
    "accTrType":value.accTrType,
    "createdBy":this.gVariable.authentication.user_detail.firstName
  }
  if(this.action==="add_accType"){
      req["credit_acc"]=true;
      req["debit_acc"]=true;
    this.accountTypeServ.createAccTypes(req).then((res:any)=>{
      if(res.data){
        this.toastService.showSuccess('Account Type created successfully.');
                this.onCloseModal(res.data);
                this.spinner = false;
                this.formGroup.reset();
     }
  }).catch(err=>{
    this.spinner = false;
  });
  }else{
    req["id"]=this.accTypeObj.id
    this.accountTypeServ.updateAccTypes(req).then((res:any)=>{
      if(res.data){
        this.toastService.showSuccess('Account Type Updated.');
                this.onCloseModal(res.data);
                this.spinner = false;
                this.formGroup.reset();
     }
    }).catch(err=>{
      this.spinner = false;
    })
  }


}

}
