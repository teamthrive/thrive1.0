import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incorporation',
  templateUrl: './incorporation.component.html',
  styleUrls: ['./incorporation.component.css']
})
export class IncorporationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedSection: number = 3;
  totalNumPages: number = 5;

  myThrivePreferences = {
    "incorpReasons": {
      "limitLiab": false,
      "simpTax": false,
      "professional": false,
      "business": false,
      "fundraise":false
    },
    "typeCorp": "llc",
    "corpInfo": {
      "name": "Thrive",
      "regAgent": "Stephen Blank",
      "purpose": "1099 tax solution",
      "organizer": "Lean Launchpad",
      "members": "Trent, Wendy, Sean, Parker, Sahil",
      "manageStruct": "Awesome team of 5",
      "address1": "123 Thrive Avenue",
      "address2": "",
      "city": "Stanford",
      "state": "CA",
      "zip": "94305"
    },
    "financials": {
      "annualIncome": 100000,
      "annualExpenses": 0,
      "filingStatus": "single",
      "scorpSalary": 0,
      "additionalTaxableIncome": 0,
      "estCompanyAssets": 0,
      "specificedServiceBusiness": false
    }
  }

  TAX_BRACKETS = [
    0,
    9525,
    38700,
    82500,
    157500,
    200000,
    500000,
    100000000
  ] 
  
  applyIncorp() {
    console.log(this.myThrivePreferences.corpInfo)
    this.selectedSection = this.selectedSection + 1;
  }

  nextClicked() {
    console.log(this.myThrivePreferences)
    this.selectedSection = this.selectedSection + 1;
  }

  prevClicked() {
    console.log(this.myThrivePreferences)
    if(this.selectedSection > 1) {
      this.selectedSection = this.selectedSection - 1;
    }
  }

  getFederalIncomeTax(income){
    let remaining = income * 0.9235;
    let totalTax = 0;

    // if(remaining > 0){
    //   let taxInBracket = Math.min(9525, remaining) * 0.10
    //   totalTax += taxInBracket;
    //   console.log(taxInBracket);
    // }
    // remaining -= 9525;

    // if(remaining > 9525){
    //   let taxInBracket = (Math.min(38700, remaining) - 9525) * 0.12
    //   totalTax += taxInBracket;
    //   console.log(taxInBracket);
    // }
    // remaining -= 38700;

    // if(remaining > 38700){
    //   let taxInBracket = (Math.min(82500, remaining) - 38700) * 0.22
    //   totalTax += taxInBracket;
    //   console.log(taxInBracket);
    // }
    // remaining -= 82500;

    // if(remaining > 82500){
    //   let taxInBracket = (Math.min(157500, remaining) - 82500) * 0.24
    //   totalTax += taxInBracket;
    //   console.log(taxInBracket);
    // }
    // remaining -= 157500;

    // if(remaining > 157500){
    //   let taxInBracket = (Math.min(200000, remaining) - 157500) * 0.32
    //   totalTax += taxInBracket;
    //   console.log(taxInBracket);
    // }
    // remaining -= 200000;

    // if(remaining > 200000){
    //   let taxInBracket = (Math.min(500000, remaining) - 200000) * 0.35
    //   totalTax += taxInBracket;
    //   console.log(taxInBracket);
    // }
    // remaining -= 500000;

    // if(remaining > 500000){
    //   let taxInBracket = remaining * 0.37;
    //   totalTax += taxInBracket;
    //   console.log(taxInBracket);
    // }
    // return totalTax;
    var i;
    for (i = 1; i < this.TAX_BRACKETS.length; i++) { 
      if(remaining > this.TAX_BRACKETS[i - 1]){
        console.log('remaining: ' + remaining);
        console.log('this.TAX_BRACKETS[i - 1]: ' + this.TAX_BRACKETS[i - 1]);
        console.log('diff: ' + (remaining - this.TAX_BRACKETS[i - 1]));
        remaining -= this.TAX_BRACKETS[i - 1];
      }
    }
  }

  calculateSPTaxes() {
    let income = this.myThrivePreferences.financials.annualIncome;
    let expenses = this.myThrivePreferences.financials.annualExpenses;

    console.log('income: ' + income);
    console.log('expenses: ' + expenses);

    let net_self_employ_income = income - expenses;
    let portion_se_subject_to_tax = 0.9235 * net_self_employ_income;
    let fica_ss = 0.124 * portion_se_subject_to_tax;
    let fica_medicare = 0.029 * portion_se_subject_to_tax;
    let fica_medicare_add = 0;
    if(income > 200000){
      fica_medicare_add = 0.009 * (income - 200000);
    }
    let total_se_tax = fica_ss + fica_medicare + fica_medicare_add;

    let se_tax_deduction = 0.5 * income;
    let taxable_income = income - se_tax_deduction;
    let federal_income_tax = this.getFederalIncomeTax(income);
    console.log('federal income tax: ' + federal_income_tax)
    return federal_income_tax;
  }

}
