import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { GlobalVariable, StaticConfig } from '../../../../core';
import { AccountTypeService } from '../../../../api-services/internal/account-type.service';
import { CreateAccountTypeComponent } from '../create-account-type/create-account-type.component';
import { ViewAccountTypeComponent } from '../view-account-type/view-account-type.component';
import { RemoveAccountTypeComponent } from '../remove-account-type/remove-account-type.component';

@Component({
  selector: 'app-account-type-list',
  templateUrl: './account-type-list.component.html',
  styleUrls: ['./account-type-list.component.scss']
})
export class AccountTypeListComponent implements OnInit {

  bsModalRef: BsModalRef;
  public onClose: Subject<boolean>;
  public gridOnChangeTime = new Date().getTime();
  public gridEvent: any = {};
  public gridConfig: any = {};
  private action: string;
  private role:any;
  public roleObj:any={};
  public accTypeObj={};

  constructor(private gVariable: GlobalVariable, private modalService: BsModalService,private accTypeService:AccountTypeService) { 
        this.role=this.gVariable.authentication.user_detail.role;
  }

  ngOnInit() {
      this.initUserGridConfig();

  }

  private initUserGridConfig() {

   Object.keys(StaticConfig.ACCESS_TYPE).forEach(key=>{
       if(StaticConfig.ACCESS_TYPE[key].ID==this.role){
           this.roleObj[StaticConfig.ACCESS_TYPE[key].NAME]=StaticConfig.ACCESS_TYPE[key].NAME;
       }
   });
  
    this.gridConfig = {
        'apiSev': this.accTypeService,
        'sevFunction': 'findByAccTypes',
        'apiParameters': {},
        'searchParameters': [],
        'primaryKey': 'id',
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
        'name': 'AccountType Name',
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
        },
        // 'dataStyle': {'text-align': 'left'},
    });
    this.gridConfig.columns.push({
        'name': 'Account Type No',
        'key': 'accTypeNo',
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
        // 'dataStyle': {'text-align': 'left'},
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
                {'action': 'view', 'name': 'View', 'icon': 'fa fa-eye', 'style': {color: 'black'},'accessRole':(this.roleObj.ADMIN)},
                {'action': 'edit', 'name': 'Edit', 'icon': 'fa fa-edit', 'style': {color: 'black'},'accessRole':(this.roleObj.ADMIN)},
                {'action': 'remove', 'name': 'Remove Account-Type', 'icon': 'fa fa-remove', 'style': {color: 'red'},'accessRole':this.roleObj.ADMIN}
            ]
        },
        'width': 35
    });
}

public onClickAddBtn() {
  this.action = 'add_accType';
  this.accTypeObj = {};
  this.openUserModal();
}


public onGridActionEvent($event) {
  switch ($event.action) {
      case 'view': {
          this.action = 'view_accType';
          this.accTypeObj = $event.record;
          this.openUserDetailModal();
          break;
      }
      case 'edit': {
          this.action = 'edit_accType';
          this.accTypeObj = $event.record;
          this.openUserModal();
          break;
      }
      case 'status': {
          this.action = 'status';
          this.accTypeObj = $event.record;
          this.openStatusModal();
          break;
      }
      case 'remove': {
          this.action = 'remove';
          this.accTypeObj = $event.record;
          this.openRemoveModal();
          break;
      }
      default: {
          break;
      }
  }
}

private onCallGridEven(event: string, data: any) {
  this.gridOnChangeTime = new Date().getTime();
  this.gridEvent.event = event;
  this.gridEvent.data = data;
}

private openStatusModal() {
  // const modalConfig: any = {
  //     class: 'modal-s background-transparent',
  //     animated: true,
  //     keyboard: true,
  //     backdrop: true,
  //     ignoreBackdropClick: true
  // };
  // this.bsModalRef = null;
  // this.bsModalRef = this.modalService.show(SetStatusComponent, modalConfig);
  // this.bsModalRef.content.action = this.action;
  // this.bsModalRef.content.userObj = Object.assign({}, this.userDetail || {});
  // this.bsModalRef.content.onClose.subscribe(response => {
  //     if (response.data) {
  //         const data = {
  //             'id': response.data.id,
  //             'role': response.data.role,
  //         };
  //         this.onCallGridEven('edit', data);
  //     }
  // });
}

private openUserModal() {
  const modalConfig: any = {
      class: 'modal-lg background-transparent',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
  };
  this.bsModalRef = null;
  this.bsModalRef = this.modalService.show(CreateAccountTypeComponent, modalConfig);
  this.bsModalRef.content.action = this.action;
  this.bsModalRef.content.accTypeObj = Object.assign({}, this.accTypeObj || {});
  this.bsModalRef.content.onClose.subscribe(response => {
      if (response.data) {
          if (response.action === 'add_accType') {
              this.onCallGridEven('add', response.data);
          } else if (response.action === 'edit_accType') {
              this.onCallGridEven('edit', response.data);
          }
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
  this.bsModalRef = this.modalService.show(ViewAccountTypeComponent, modalConfig);
  this.bsModalRef.content.action = this.action;
  this.bsModalRef.content.accTypeObj = Object.assign({}, this.accTypeObj || {});
}

private openRemoveModal() {
  const modalConfig: any = {
      class: 'modal-s background-transparent',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
  };
  this.bsModalRef = null;
  this.bsModalRef = this.modalService.show(RemoveAccountTypeComponent, modalConfig);
  this.bsModalRef.content.action = this.action;
  this.bsModalRef.content.accTypeObj = Object.assign({}, this.accTypeObj || {});
  this.bsModalRef.content.onClose.subscribe(response => {
      if (response) {
          const data = {
              'id': response.data.id,
          };
          this.onCallGridEven('delete', data);
      }
  });
}


}
