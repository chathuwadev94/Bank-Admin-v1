import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customerObj:any={};
  onClose:Subject<boolean>;

  constructor(private bsModalRef:BsModalRef) { 
    this.onClose = new Subject();
  }

  ngOnInit() {
  }

  onCloseModal(res:any){
  
    this.bsModalRef.hide();
  }

}
