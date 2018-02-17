import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialService } from "../../services/financial.service";

@Component({
  selector: 'app-incorporation',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  // message:string;

  constructor(private router: Router, private data: FinancialService) { }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message => this.message = message)
  }

  submittedFinancials = false;

  myThrivePreferences = {
    "financials": {
      "annualIncome": 0,
      "monthlyIncome": 2000.00,
      "annualExpenses": 0,
      "filingStatus": "single",
      "scorpSalary": 0,
      "additionalTaxableIncome": 0,
      "estCompanyAssets": 0,
      "specificedServiceBusiness": false,
      "firstName": "",
      "lastName": "",
      "email": "",
      "state": "CA",
      "workType": "Consultant"
    }
  }

  spTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ADeductions": 0,
    "totalStateIncomeTaxes": 0,
    "totalTaxes": 0
  }

  llcTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ADeductions": 0,
    "totalStateIncomeTaxes": 0,
    "totalTaxes": 0
  }

  ccorpTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ADeductions": 0,
    "totalStateIncomeTaxes": 0,
    "totalTaxes": 0
  }

  scorpTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ADeductions": 0,
    "totalStateIncomeTaxes": 0,
    "totalTaxes": 0
  }


  STATES = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
  ]

  OCCUPATIONS = [
    "Consultant",
    "Creative Professional",
    "Tradesman",
    "Engineer",
    "Architect",
    "Doctor",
    "Lawyer",
    "Other"
  ]

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

  TAX_RATES = [
    0.10,
    0.12,
    0.22,
    0.24,
    0.32,
    0.35,
    0.37
  ]

  getSelfEmploymentTax(income) {
    let taxable_amt = income * 0.9235;
    let fica_ss_tax = 0.124 * taxable_amt;
    let fica_mc_tax = 0.029 * taxable_amt;
    let fica_mc_tax_add = 0;
    if(income > 200000) {
      fica_mc_tax_add = 0.009 * taxable_amt;
    }
    let total_se_tax = fica_ss_tax + fica_mc_tax + fica_mc_tax_add;
    return total_se_tax;
  }

  getFederalIncomeTax(income){
    let taxable_amt = income;
    let totalTax = 0;
    // console.log(taxable_amt);
    
    var i;
    for (i = 1; i < this.TAX_BRACKETS.length; i++) { 
      if(taxable_amt > this.TAX_BRACKETS[i-1]){
        let tax_chunk = Math.min(this.TAX_BRACKETS[i] - this.TAX_BRACKETS[i-1], taxable_amt);
        totalTax += tax_chunk * this.TAX_RATES[i-1];
        taxable_amt -= tax_chunk;
      } else if(taxable_amt > 0) {
        let tax_chunk = taxable_amt;
        totalTax += tax_chunk * this.TAX_RATES[i-1];
        taxable_amt -= tax_chunk;
      }
    }
    console.log('total tax: ' + totalTax);
    return totalTax;
  }

  submitAnnualIncome() {
    this.myThrivePreferences.financials.annualIncome = parseInt(Number(12 * this.myThrivePreferences.financials.monthlyIncome).toFixed(2));
    this.myThrivePreferences.financials.scorpSalary = 0.4 * this.myThrivePreferences.financials.annualIncome;
    return
  }

  submitFinancialInformation() {
    this.myThrivePreferences.financials.monthlyIncome = parseFloat(Number(this.myThrivePreferences.financials.annualIncome / 12.0).toFixed(2));
    // console.log(this.myThrivePreferences.financials);

    this.calculateSPTaxes();
    this.calculateLLCTaxes();
    this.calculateCCorpTaxes();
    this.calculateSCorpTaxes();

    this.submittedFinancials = true;
    // this.router.navigate(["comparisons"]);
  }

  calculateSPTaxes() {
    this.spTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome - 0.5 * this.getSelfEmploymentTax(this.myThrivePreferences.financials.annualIncome));
    this.spTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax(this.myThrivePreferences.financials.annualIncome);
    this.spTaxes.totalTaxes = parseFloat(Number(this.spTaxes.totalFederalTaxes + this.spTaxes.totalSelfEmploymentTaxes + this.spTaxes.totalStateIncomeTaxes + this.spTaxes.total199ADeductions).toFixed(2));
  }

  calculateLLCTaxes() {
    this.llcTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome);
    this.llcTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax(this.myThrivePreferences.financials.annualIncome);
    this.llcTaxes.totalTaxes = parseFloat(Number(this.llcTaxes.totalFederalTaxes + this.llcTaxes.totalSelfEmploymentTaxes + this.llcTaxes.totalStateIncomeTaxes + this.llcTaxes.total199ADeductions).toFixed(2));
  }

  calculateCCorpTaxes() {
    this.ccorpTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome);
    this.ccorpTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax(this.myThrivePreferences.financials.annualIncome);
    this.ccorpTaxes.totalTaxes = parseFloat(Number(this.ccorpTaxes.totalFederalTaxes + this.ccorpTaxes.totalSelfEmploymentTaxes + this.ccorpTaxes.totalStateIncomeTaxes + this.ccorpTaxes.total199ADeductions).toFixed(2));
  }

  calculateSCorpTaxes() {
    this.scorpTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.scorpSalary);
    this.scorpTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax(this.myThrivePreferences.financials.scorpSalary);
    this.scorpTaxes.totalTaxes = parseFloat(Number(this.scorpTaxes.totalFederalTaxes + this.scorpTaxes.totalSelfEmploymentTaxes + this.scorpTaxes.totalStateIncomeTaxes + this.scorpTaxes.total199ADeductions).toFixed(2));
  }

  incorporate() {
    this.router.navigate(['incorporate']);
  }

}
