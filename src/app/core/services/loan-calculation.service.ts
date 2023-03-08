import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanCalculationService {

  constructor() { }

  public  advanceLoanCalculator( api : LoanCalculationRequest) {
    // convertToMonthBase(api);
    let interest = api.interestRate;
    let period = api.period;
    let monthlyRePayment = this.getMonthlyRepayment(api.loanAmount, interest, period);

    let response = {
      monthlyRePayment: monthlyRePayment,
      totalValue:monthlyRePayment * period,
      totalInterest:(monthlyRePayment * period) - api.loanAmount,
      monthWisePayments: this.getLoanPaymentDetails(api.loanAmount, interest, period, monthlyRePayment)
    }
    return response;
}

  public getMonthlyRepayment(loanAmount : number,monthlyInterestRate:number, periodAsMonth:number){

    //        a/{[(1+r)^n]-1}/[r(1+r)^n]=p
//        monthly payment (p)
//        total loan amount (a)
//        periodic interest rate (r)
//        total number of payment periods (n)

//        partA = {[(1+r)^n]-1}
//        partB = [r(1+r)^n]
//        payment = (loanAmount * partB) / partA
//        https://www.thebalance.com/loan-payment-calculations-315564

    let onePlusR = 1 + (monthlyInterestRate * 0.01);
    let onePlusRtoPowerPeriod = 1;

    for(let i=1;i<=periodAsMonth;i++){
      onePlusRtoPowerPeriod = onePlusRtoPowerPeriod * onePlusR;
    }
    let partA = onePlusRtoPowerPeriod -1;
    let partB = onePlusRtoPowerPeriod * (monthlyInterestRate * 0.01);
    return (loanAmount * partB) / partA ;
  }

  public getLoanPaymentDetails( loanAmount : number, monthlyInterestRate : number, periodAsMonths : number, monthlyPayment : number) {

    let availableLoanAmount = loanAmount;
    let details = [];
    for (let i = 1; i <= periodAsMonths; i++) {

        let currentMonthInterest = availableLoanAmount * (monthlyInterestRate * 0.01);
        let currentMonthPrinciple = monthlyPayment - currentMonthInterest;

        let monthDetails = {
          month : i,
          startingBalance : availableLoanAmount,
          rePayment:monthlyPayment,
          interestPaid:currentMonthInterest,
          principlePaid:currentMonthPrinciple,
          newBalance:(availableLoanAmount - currentMonthPrinciple)
        };
        details.push(monthDetails);
        availableLoanAmount = availableLoanAmount - currentMonthPrinciple;
    }

    return details;
}
}

class LoanCalculationRequest{
  loanAmount: number;
  interestRate : number;
  period : number;
}
