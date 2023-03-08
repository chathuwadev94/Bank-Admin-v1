import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { GlobalVariable, StaticConfig } from '../../../../core';
import { CustomerRemoveComponent } from '../customer-remove/customer-remove.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { CustomerService } from '../../../../api-services/internal/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  bsModalRef: BsModalRef;
  public onClose: Subject<boolean>;
  public gridOnChangeTime = new Date().getTime();
  public gridEvent: any = {};
  public gridConfig: any = {};
  private action: string;
  private role:any;
  public roleObj:any={};
  public customerObj={};
  public searchObj:any={};

  constructor(private gVariable: GlobalVariable, private modalService: BsModalService, private customerService:CustomerService) { 
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
         'apiSev': this.customerService,
         'sevFunction': 'findByCustomer',
         'apiParameters': {},
         'searchParameters': [],
         'primaryKey': 'custId',
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
             'key': 'firstName',
             'value': 'asc'  // 'asc' 'desc
         }
     };
     this.gridConfig.columns.push({
         'name': 'First Name',
         'key': 'firstName',
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
         'name': 'Last Name',
         'key': 'lastName',
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
      'name': 'NIC',
      'key': 'NIC',
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
    'name': 'Mobile No',
    'key': 'mobileNo',
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
                 {'action': 'view', 'name': 'View', 'icon': 'fa fa-eye', 'style': {color: 'black'},'accessRole':(this.roleObj.ADMIN || this.roleObj.MANAGER || this.roleObj.USER)},
                 {'action': 'edit', 'name': 'Edit', 'icon': 'fa fa-edit', 'style': {color: 'black'},'accessRole':(this.roleObj.ADMIN || this.roleObj.MANAGER)},
                 {'action': 'remove', 'name': 'Remove Customer', 'icon': 'fa fa-remove', 'style': {color: 'red'},'accessRole':(this.roleObj.ADMIN || this.roleObj.MANAGER)}
             ]
         },
         'width': 35
     });
 }
 
 public onClickAddBtn() {
   this.action = 'add_customer';
   this.customerObj = {};
   this.openUserModal();
 }
 
 
 public onGridActionEvent($event) {
   switch ($event.action) {
       case 'view': {
           this.action = 'view_customer';
           this.customerObj = $event.record;
           this.openUserDetailModal();
           break;
       }
       case 'edit': {
           this.action = 'edit_customer';
           this.customerObj = $event.record;
           this.openUserModal();
           break;
       }
       case 'status': {
           this.action = 'status';
           this.customerObj = $event.record;
           this.openStatusModal();
           break;
       }
       case 'remove': {
           this.action = 'remove';
           this.customerObj = $event.record;
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

 public onClickSearchBtn(){
     this.searchObj["key"]="NIC";
     this.searchObj["operator"]="like";
     this.onCallGridEven('search',this.searchObj);
 }
 
 public onClickClearBtn(){
     this.onCallGridEven('clear',{});
     this.searchObj.value=null;
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
   this.bsModalRef = this.modalService.show(CustomerCreateComponent, modalConfig);
   this.bsModalRef.content.action = this.action;
   this.bsModalRef.content.customerObj = Object.assign({}, this.customerObj || {});
   this.bsModalRef.content.onClose.subscribe(response => {
       if (response.data) {
           if (response.action === 'add_customer') {
               this.onCallGridEven('add', response.data);
           } else if (response.action === 'edit_customer') {
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
   this.bsModalRef = this.modalService.show(CustomerDetailsComponent, modalConfig);
   this.bsModalRef.content.action = this.action;
   this.bsModalRef.content.customerObj = Object.assign({}, this.customerObj || {});
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
   this.bsModalRef = this.modalService.show(CustomerRemoveComponent, modalConfig);
   this.bsModalRef.content.action = this.action;
   this.bsModalRef.content.customerObj = Object.assign({}, this.customerObj || {});
   this.bsModalRef.content.onClose.subscribe(response => {
       if (response) {
           const data = {
               'custId': response.data,
           };
           this.onCallGridEven('delete', data);
       }
   });
 }

}
