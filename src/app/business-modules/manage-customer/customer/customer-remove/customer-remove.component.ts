import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from '../../../../api-services/internal/customer.service';
import { ToastService } from '../../../../core';

@Component({
  selector: 'app-customer-remove',
  templateUrl: './customer-remove.component.html',
  styleUrls: ['./customer-remove.component.scss']
})
export class CustomerRemoveComponent implements OnInit {

  customerObj:any={};
  onClose:Subject<boolean>;
  action:any;
  spinner:boolean=false;

  constructor(private bsModalRef:BsModalRef,private customerService:CustomerService,private toastService:ToastService) {
    this.onClose=new Subject();
   }

  ngOnInit() {
  }

  onClickRemove(){
    this.spinner=true;
    let req={
      custId: this.customerObj.custId
    }
    this.customerService.removeCustomer(req).then((response:any)=>{
        if(response){
          this.toastService.showSuccess('Customer Delete successfully.');
          this.onCloseModal(response);
          this.spinner=false;
        }
    }).catch(err=>{
      console.log(err);
      this.spinner=false;
    })
  }

  onCloseModal(response:any){
    if(response){
     let object:any={
        action:this.action,
        data:response.custId
      }
      this.onClose.next(object);
    }

    this.bsModalRef.hide();
  }

}
