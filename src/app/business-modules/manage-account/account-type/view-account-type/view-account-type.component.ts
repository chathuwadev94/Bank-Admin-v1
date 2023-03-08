import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-account-type',
  templateUrl: './view-account-type.component.html',
  styleUrls: ['./view-account-type.component.scss']
})
export class ViewAccountTypeComponent implements OnInit {

  public accTypeObj:any={};
  public action: any;
  public onClose: Subject<boolean>;

  constructor(private bsModalRef:BsModalRef) { 
    this.onClose = new Subject();
  }

  ngOnInit() {

    setTimeout(()=>{
    },100)
  }

  onCloseModal(res:any){
    this.bsModalRef.hide();
  }

}
