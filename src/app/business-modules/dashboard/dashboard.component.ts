import { Component, OnInit } from '@angular/core';
import {GlobalVariable} from '../../core/com-classes';
import { LoanCalculationService } from '../../core/services/loan-calculation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loanReq:any ={};
  public loanAdvanceInfo: any = {};

  constructor(public gVariable: GlobalVariable,private loanCalculationSev:LoanCalculationService) { }

  ngOnInit() {
  }

  public calculate(obj){
    console.log(obj);
    this.loanAdvanceInfo = {};
    if (obj.valid) {
      let loanDetail: any ={
        loanAmount: obj.value.totalLoan,
        period:obj.value.termOfLoan,
        interestRate:obj.value.interestRate
      }
      this.loanAdvanceInfo=this.loanCalculationSev.advanceLoanCalculator(loanDetail);
      console.log(this.loanAdvanceInfo);
    }
  }

  public clear(){
    this.loanAdvanceInfo = {};
    this.loanReq = {};
  }

}
