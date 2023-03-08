import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountTypeService } from '../../../../api-services/internal/account-type.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from '../../../../core';

@Component({
  selector: 'app-remove-account-type',
  templateUrl: './remove-account-type.component.html',
  styleUrls: ['./remove-account-type.component.scss']
})
export class RemoveAccountTypeComponent implements OnInit {

  accTypeObj:any={};
  action:any;
  spinner:boolean=false;
  onClose: Subject<boolean>;
  
  constructor(private accTypeService:AccountTypeService,private bsModalRef:BsModalRef,private toastService:ToastService) { 
    this.onClose= new Subject();
  }

  ngOnInit() {
    setTimeout(()=>{
      
    },100);
  }

  onClickRemove(){
    this.spinner=true;
    let req={
      "id":this.accTypeObj.id
    }
    this.accTypeService.removeAccTypes(req).then((res:any)=>{
      this.toastService.showSuccess('Account Type Delete successfully.');
        if(res){
          this.onCloseModal(res);
          this.spinner=false;
        }
    }).catch(()=>{
      this.spinner=false;
    });

  }

  onCloseModal(response:any){
    if(response){
     let obj:any={
        action:this.accTypeObj.action,
        data:response
      }
      this.onClose.next(obj);
    }
    this.bsModalRef.hide();
  }
}
