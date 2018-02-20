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
      "monthlyIncome": 10000,
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
      "workType": "Real Estate Agent"
    }
  }

  spTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
    "totalTaxes": 0
  }

  llcTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
    "totalTaxes": 0
  }

  ccorpTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
    "totalTaxes": 0
  }

  scorpTaxes = {
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
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
    "Real Estate Agent",
    "Architect",
    "Consultant",
    "Creative Professional",
    "Doctor",
    "Engineer",
    "Lawyer",
    "Salesperson",
    "Tradesman",
    "Other"
  ]

  FEDERAL_TAX_BRACKETS = [
    0,
    9525,
    38700,
    82500,
    157500,
    200000,
    500000,
    100000000
  ]

  FEDERAL_TAX_RATES = [
    0.10,
    0.12,
    0.22,
    0.24,
    0.32,
    0.35,
    0.37
  ]

  FRANCHISE_TAX_BRACKETS = [
    0,
    8015,
    19001,
    29989,
    41629,
    52612,
    268750,
    322499,
    537498,
    1000000,
    100000000
  ]

  FRANCHISE_TAX_RATES = [
    0.01,
    0.02,
    0.04,
    0.06,
    0.08,
    0.093,
    0.103,
    0.113,
    0.123,
    0.133
  ]

  PERCENTAGE_INCOME_AS_SALARY = 0.4;
  PERCENTAGE_INCOME_AS_BUSINESS_EXPENSE = 0.2;
  PERCENTAGE_SE_INCOME_SUBJECT_TO_TAX = 0.9235;
  FICA_SOCIAL_SECURITY_RATE = 0.062;
  FICA_MEDICARE_RATE = 0.029;
  FICA_MEDICARE_RATE_ADDITIONAL = 0.009;
  PERCENTAGE_SE_TAX_DEDUCTION = 0.5;

  //State Tax Constants
  WAGE_LIMIT = 7000;
  STATE_DISABILITY_INSURANCE = 114967;

  submitAnnualIncome() {
    this.myThrivePreferences.financials.annualIncome = parseInt(Number(12 * this.myThrivePreferences.financials.monthlyIncome).toFixed(2));
    this.myThrivePreferences.financials.scorpSalary = this.PERCENTAGE_INCOME_AS_SALARY * this.myThrivePreferences.financials.annualIncome;
    return
  }

  submitFinancialInformation() {
    this.myThrivePreferences.financials.monthlyIncome = parseFloat(Number(this.myThrivePreferences.financials.annualIncome / 12.0).toFixed(2));
    // console.log(this.myThrivePreferences.financials);

    this.calculateSCorpTaxes();
    this.calculateSPTaxes();
    this.calculateCCorpTaxes();
    // this.calculateLLCTaxes();

    this.submittedFinancials = true;
  }

  getSelfEmploymentTax_SP(income) {
    let taxable_amt = income * this.PERCENTAGE_SE_INCOME_SUBJECT_TO_TAX;
    let net_se_income = (1 - this.PERCENTAGE_INCOME_AS_BUSINESS_EXPENSE) * taxable_amt;

    let fica_ss_employee_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * net_se_income)
    let fica_ss_employer_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * net_se_income)
    let fica_mc_tax = this.FICA_MEDICARE_RATE * net_se_income;
    let fica_mc_tax_add = 0;
    if(income > 200000) {
      fica_mc_tax_add = this.FICA_MEDICARE_RATE_ADDITIONAL * net_se_income;
    }
    let total_se_tax = fica_ss_employee_tax + fica_ss_employer_tax + fica_mc_tax + fica_mc_tax_add;
    console.log("Self Employment Tax: " + total_se_tax);
    return total_se_tax;
  }

  getSelfEmploymentTax_SCorp(income) {
    let fica_ss_employee_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * income)
    let fica_ss_employer_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * income)
    let fica_mc_tax = this.FICA_MEDICARE_RATE * income;
    let fica_mc_tax_add = 0;
    if(income > 200000) {
      fica_mc_tax_add = this.FICA_MEDICARE_RATE_ADDITIONAL * income;
    }
    let total_se_tax = fica_ss_employee_tax + fica_ss_employer_tax + fica_mc_tax + fica_mc_tax_add;
    console.log("Scorp Self Employment Tax: " + total_se_tax);
    return total_se_tax;
  }

  getFederalIncomeTax(taxable_amt){
    let totalTax = 0;
    var i;
    for (i = 1; i < this.FEDERAL_TAX_BRACKETS.length; i++) { 
      if(taxable_amt > this.FEDERAL_TAX_BRACKETS[i-1]){
        let tax_chunk = Math.min(this.FEDERAL_TAX_BRACKETS[i] - this.FEDERAL_TAX_BRACKETS[i-1], taxable_amt);
        totalTax += tax_chunk * this.FEDERAL_TAX_RATES[i-1];
        taxable_amt -= tax_chunk;
      } else if(taxable_amt > 0) {
        let tax_chunk = taxable_amt;
        totalTax += tax_chunk * this.FEDERAL_TAX_RATES[i-1];
        taxable_amt -= tax_chunk;
      }
    }
    console.log('Total Federal Tax: ' + totalTax);
    return totalTax;
  }

  getFranchiseTax(taxable_amt) {
    let totalTax = 0;
    var i;
    for (i = 1; i < this.FRANCHISE_TAX_BRACKETS.length; i++) { 
      if(taxable_amt > this.FRANCHISE_TAX_BRACKETS[i-1]){
        let tax_chunk = Math.min(this.FRANCHISE_TAX_BRACKETS[i] - this.FRANCHISE_TAX_BRACKETS[i-1], taxable_amt);
        totalTax += tax_chunk * this.FRANCHISE_TAX_RATES[i-1];
        taxable_amt -= tax_chunk;
      } else if(taxable_amt > 0) {
        let tax_chunk = taxable_amt;
        totalTax += tax_chunk * this.FRANCHISE_TAX_RATES[i-1];
        taxable_amt -= tax_chunk;
      }
    }
    console.log('Total Franchise Tax: ' + totalTax);
    return totalTax;
  }

  getStateUnemployementTaxes_SP(taxable_amt) {
    console.log("Calculating SP Unemployment Taxes");

    let state_unemployment_insurance = Math.min(0.034 * this.WAGE_LIMIT, 0.034 * taxable_amt);
    let federal_unemployment = Math.min(0.006 * this.WAGE_LIMIT, 0.006 * taxable_amt);
    let state_disability_insurance = Math.min(0.01 * this.STATE_DISABILITY_INSURANCE, 0.01 * taxable_amt);

    let total_state_unemployment_taxs = state_unemployment_insurance + federal_unemployment + state_disability_insurance;
    console.log(total_state_unemployment_taxs);
    return total_state_unemployment_taxs;
  }

  get199ABenefit(income) {
    let taxable_amt = this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes;
    let margin_rate = 0;
    var i;
    for(i = 0; i < this.FEDERAL_TAX_BRACKETS.length - 1; i++) {
      if(taxable_amt > this.FEDERAL_TAX_BRACKETS[i]) {
        margin_rate = this.FEDERAL_TAX_RATES[i]
      }
    }

    let deduction = 0.2 * income;
    return deduction * margin_rate;  
  }
  
  calculateSCorpTaxes() {
    console.log("Calculating S-Corp Taxes");
    // console.log(this.myThrivePreferences.financials.scorpSalary);
    
    this.scorpTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax_SP(this.myThrivePreferences.financials.annualIncome);
    this.scorpTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.scorpTaxes.totalStateIncomeTaxes = this.getFranchiseTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.scorpTaxes.totalStateUnemploymentTaxes = this.getStateUnemployementTaxes_SP(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.scorpTaxes.total199ABenefit = this.get199ABenefit(this.myThrivePreferences.financials.annualIncome);
    // Total tax liability
    this.scorpTaxes.totalTaxes = this.scorpTaxes.totalFederalTaxes + 
                              this.scorpTaxes.totalSelfEmploymentTaxes + 
                              this.scorpTaxes.totalStateIncomeTaxes + 
                              this.scorpTaxes.totalStateUnemploymentTaxes - 8000 -
                              this.scorpTaxes.total199ABenefit;
    console.log(this.scorpTaxes.totalTaxes);
    
  }


  calculateSPTaxes() {
    console.log("Calculating SP Taxes");
    this.spTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax_SP(this.myThrivePreferences.financials.annualIncome);
    this.spTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.spTaxes.totalStateIncomeTaxes = this.getFranchiseTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.spTaxes.totalStateUnemploymentTaxes = this.getStateUnemployementTaxes_SP(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.spTaxes.total199ABenefit = this.get199ABenefit(this.myThrivePreferences.financials.annualIncome);
    // Total tax liability
    this.spTaxes.totalTaxes = this.spTaxes.totalFederalTaxes + 
                              this.spTaxes.totalSelfEmploymentTaxes + 
                              this.spTaxes.totalStateIncomeTaxes + 
                              this.spTaxes.totalStateUnemploymentTaxes -
                              this.spTaxes.total199ABenefit;
    console.log(this.spTaxes.totalTaxes);
    
  }

  // calculateLLCTaxes() {
  //   console.log("Calculating LLC Taxes");
  //   this.llcTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome);
  //   this.llcTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax(this.myThrivePreferences.financials.annualIncome);
  //   this.llcTaxes.totalTaxes = this.llcTaxes.totalFederalTaxes + this.llcTaxes.totalSelfEmploymentTaxes + this.llcTaxes.totalStateIncomeTaxes + this.llcTaxes.total199ABenefit;
  // }

  calculateCCorpTaxes() {
    console.log("Calculating C-Corp Taxes");
    
    this.ccorpTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax_SP(this.myThrivePreferences.financials.annualIncome);
    this.ccorpTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.ccorpTaxes.totalStateIncomeTaxes = this.getFranchiseTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.ccorpTaxes.totalStateUnemploymentTaxes = this.getStateUnemployementTaxes_SP(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.ccorpTaxes.total199ABenefit = this.get199ABenefit(this.myThrivePreferences.financials.annualIncome);
    // Total tax liability
    this.ccorpTaxes.totalTaxes = this.ccorpTaxes.totalFederalTaxes + 
                              this.ccorpTaxes.totalSelfEmploymentTaxes + 
                              this.ccorpTaxes.totalStateIncomeTaxes + 
                              this.ccorpTaxes.totalStateUnemploymentTaxes - 3123 -
                              this.ccorpTaxes.total199ABenefit;
    console.log(this.ccorpTaxes.totalTaxes);
  }

  incorporate() {
    this.router.navigate(['incorporate']);
  }

}
