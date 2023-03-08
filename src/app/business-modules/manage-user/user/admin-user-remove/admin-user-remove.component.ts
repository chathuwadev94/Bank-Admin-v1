import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../../../api-services';
import { ToastService } from '../../../../core';

@Component({
  selector: 'app-admin-user-remove',
  templateUrl: './admin-user-remove.component.html',
  styleUrls: ['./admin-user-remove.component.scss']
})
export class AdminUserRemoveComponent implements OnInit {

  private action: string;
  public onClose: Subject<boolean>;
  public userObj: any = {};
  public statusList = [];
  public statusObj = {
      id: null
  };
  public spinner: boolean;
  constructor(public bsModalRef: BsModalRef,private userService:UserService,private toastService:ToastService) { 
    this.onClose = new Subject();
  }

  ngOnInit() {
    
  }

 public onClickRemove(){
     let req={
          id:this.userObj.id
      }
    this.userService.removeUser(req).then((res:any)=>{
        this.toastService.showSuccess('User Delete successfully.');
                this.onCloseModal(res);
                this.spinner = false;
    }).catch(()=>{
        this.spinner = false;
    });
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
}
