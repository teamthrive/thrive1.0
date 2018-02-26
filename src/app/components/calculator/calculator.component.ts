import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialService } from "../../services/financial.service";
import { MyAngularMaterialModulesModule } from "../../my-angular-material-modules/my-angular-material-modules.module";

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
  calculating = false;
  interval;

  myThrivePreferences = {
    "financials": {
      "annualIncome": 120000,
      "monthlyIncome": 10000,
      "annualExpenses": 0,
      "filingStatus": "single",
      "scorpSalary": 0,
      "additionalTaxableIncome": 0,
      "estCompanyAssets": 0,
      "specificedServiceBusiness": true,
      "firstName": "",
      "lastName": "",
      "email": "",
      "state": "CA",
      "workType": "Real Estate Agent",
      
    }
  }

  spTaxes = {
    "scheduleEIncome": 0,
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
    "totalTaxes": 0
  }

  llcTaxes = {
    "scheduleEIncome": 0,
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
    "totalTaxes": 0
  }

  ccorpTaxes = {
    "scheduleEIncome": 0,
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
    "totalTaxes": 0
  }

  scorpTaxes = {
    "scheduleEIncome": 0,
    "totalFederalTaxes": 0,
    "totalSelfEmploymentTaxes": 0,
    "total199ABenefit": 0,
    "totalStateIncomeTaxes": 0,
    "totalStateUnemploymentTaxes": 0,
    "totalTaxes": 0
  }

  /* THRIVE PRICINGS */
  THRIVE_ANNUAL_COST = 240;
  THRIVE_ANNUAL_CPA_COST = 300;

  /* Constants for tax calculations */
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

  // Assumptions for Model
  PERCENTAGE_INCOME_AS_SALARY:number = 1.0/3;
  PERCENTAGE_INCOME_AS_BUSINESS_EXPENSE = 0;

  // Tax code constants
  PERCENTAGE_SE_INCOME_SUBJECT_TO_TAX = 0.9235;
  FICA_SOCIAL_SECURITY_RATE = 0.062;
  FICA_MEDICARE_RATE = 0.029;
  FICA_MEDICARE_RATE_ADDITIONAL = 0.009;
  PERCENTAGE_SE_TAX_DEDUCTION = 0.5;

  //State Tax Constants
  WAGE_LIMIT = 7000;
  STATE_DISABILITY_INSURANCE = 114967;
  

  onInputChange(event: any) {
    // console.log(this.myThrivePreferences.financials.annualIncome);
    this.myThrivePreferences.financials.scorpSalary = 
      this.PERCENTAGE_INCOME_AS_SALARY * this.myThrivePreferences.financials.annualIncome;
      
    this.calculateSPTaxes();
    this.calculateSCorpTaxes();
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
    return totalTax;
  }

  /**************************************************/
  /************** Sole Proprietorship /**************/
  /**************************************************/

  getSelfEmploymentTax_SP(income) {
    let taxable_amt = income * this.PERCENTAGE_SE_INCOME_SUBJECT_TO_TAX;
    let net_se_income = (1 - this.PERCENTAGE_INCOME_AS_BUSINESS_EXPENSE) * taxable_amt;

    let fica_ss_employee_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * net_se_income)
    let fica_ss_employer_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * net_se_income)
    let fica_mc_tax = this.FICA_MEDICARE_RATE * net_se_income;
    let fica_mc_tax_add = 0;
    if(income > 200000) {
      fica_mc_tax_add = this.FICA_MEDICARE_RATE_ADDITIONAL * (net_se_income - 200000);
    }
    let total_se_tax = fica_ss_employee_tax + fica_ss_employer_tax + fica_mc_tax + fica_mc_tax_add;
    return total_se_tax;
  }

  getStateIncomeTax(taxable_amt) {
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
    return totalTax;
  }

  getStateUnemployementTaxes_SP(taxable_amt) {
    let state_unemployment_insurance = Math.min(0.034 * this.WAGE_LIMIT, 0.034 * taxable_amt);
    let federal_unemployment = Math.min(0.006 * this.WAGE_LIMIT, 0.006 * taxable_amt);
    let state_disability_insurance = Math.min(0.01 * this.STATE_DISABILITY_INSURANCE, 0.01 * taxable_amt);

    let total_state_unemployment_taxs = state_unemployment_insurance + federal_unemployment + state_disability_insurance;
    return total_state_unemployment_taxs;
  }

  get199ABenefit_SP(income) {
    let taxable_amt = this.myThrivePreferences.financials.annualIncome - 
        this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes;
    
    let margin_rate = 0;
    var i;
    for(i = 0; i < this.FEDERAL_TAX_BRACKETS.length - 1; i++) {
      if(taxable_amt > this.FEDERAL_TAX_BRACKETS[i]) {
        margin_rate = this.FEDERAL_TAX_RATES[i]
      }
    }

    let deduction = 0;
    let wage_temp = Math.max(0.5 * 0, 0.25 * 0 + 0.025 * this.myThrivePreferences.financials.estCompanyAssets);
    let phase_out = (income - 157500) / 50000;
    let qbi_20 = 0.2 * income;

    if(taxable_amt < 157500) {
      deduction = Math.max(0, qbi_20);
      // console.log("1: " + deduction);
      
    } else if(this.myThrivePreferences.financials.specificedServiceBusiness) {
      if(qbi_20 < wage_temp) {
        deduction = Math.max(0, qbi_20 * (1 - phase_out));
        // console.log("2: " + deduction);

      } else {
        deduction = Math.max(0, (1 - phase_out) * qbi_20 - phase_out * (qbi_20 - wage_temp));
        // console.log("3: " + deduction);

      }
    } else if(qbi_20 < wage_temp) {
      deduction = Math.max(0, qbi_20);
      // console.log("4: " + deduction);

    } else {
      deduction = Math.max(0, qbi_20 - phase_out * (qbi_20 - wage_temp));
      // console.log("5: " + deduction);
    }

    // console.log("1099a deduction: " + deduction);
    // console.log("1099a benefit: " + deduction * margin_rate);
    
    return deduction * margin_rate;  
  }

  
  /**************************************************/
  /***************** S-Corporation /*****************/
  /**************************************************/

  getSelfEmploymentTax_SCorp(income) {
    let salary = this.myThrivePreferences.financials.scorpSalary

    let fica_ss_employee_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * salary)
    let fica_ss_employer_tax = Math.min(7960.8, this.FICA_SOCIAL_SECURITY_RATE * salary)
    let fica_mc_tax = this.FICA_MEDICARE_RATE * salary;
    let fica_mc_tax_add = 0;
    if(salary > 200000) {
      fica_mc_tax_add = this.FICA_MEDICARE_RATE_ADDITIONAL * (salary - 200000);
    }
    let total_se_tax = fica_ss_employee_tax + fica_ss_employer_tax + fica_mc_tax + fica_mc_tax_add;
    return total_se_tax;
  }

  getStateUnemployementTaxes_SCorp(taxable_amt) {
    let state_unemployment_insurance = Math.min(0.034 * this.WAGE_LIMIT, 0.034 * taxable_amt);
    let federal_unemployment = Math.min(0.006 * this.WAGE_LIMIT, 0.006 * taxable_amt);
    let state_disability_insurance = Math.min(0.01 * this.STATE_DISABILITY_INSURANCE, 0.01 * taxable_amt);

    let first_bracket_tax_chunk = Math.min(taxable_amt, 16030);
    let state_employee_training_tax = Math.min(0.001 * this.WAGE_LIMIT, 0.001 * first_bracket_tax_chunk);

    let total_state_unemployment_taxs = state_unemployment_insurance + federal_unemployment + state_employee_training_tax + state_disability_insurance;
    return total_state_unemployment_taxs;
  }

  get199ABenefit_SCorp(income) {
    let taxable_amt = this.scorpTaxes.scheduleEIncome + this.myThrivePreferences.financials.scorpSalary;
    let margin_rate = 0;
    var i;
    for(i = 0; i < this.FEDERAL_TAX_BRACKETS.length - 1; i++) {
      if(taxable_amt > this.FEDERAL_TAX_BRACKETS[i]) {
        margin_rate = this.FEDERAL_TAX_RATES[i]
      }
    }


    let deduction = 0;
    let wage_temp = Math.max(0.5 * this.myThrivePreferences.financials.scorpSalary, 
        0.25 * this.myThrivePreferences.financials.scorpSalary + 
        0.025 * this.myThrivePreferences.financials.estCompanyAssets);
    
    let phase_out = (taxable_amt - 157500) / 50000;
    let qbi_20 = 0.2 * this.scorpTaxes.scheduleEIncome;

    if(taxable_amt < 157500) {
      deduction = Math.max(0, qbi_20);
      
    } else if(this.myThrivePreferences.financials.specificedServiceBusiness) {
      if(qbi_20 < wage_temp) {
        deduction = Math.max(0, qbi_20 * (1 - phase_out));

      } else {
        deduction = Math.max(0, (1 - phase_out) * qbi_20 - phase_out * (qbi_20 - wage_temp));

      }
    } else if(qbi_20 < wage_temp) {
      deduction = Math.max(0, qbi_20);

    } else {
      deduction = Math.max(0, qbi_20 - phase_out * (qbi_20 - wage_temp));
    }
    
    return deduction * margin_rate;  
  }
  
  
  /**************************************************/
  /************* Calculate Bottom Lines *************/
  /**************************************************/
  calculateSPTaxes() {
    // console.log("Calculating SP Taxes");
    this.spTaxes.scheduleEIncome = this.myThrivePreferences.financials.annualIncome;
    this.spTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax_SP(this.myThrivePreferences.financials.annualIncome);
    
    this.spTaxes.totalFederalTaxes = this.getFederalIncomeTax(
        this.myThrivePreferences.financials.annualIncome - 
        this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    
    this.spTaxes.totalStateIncomeTaxes = this.getStateIncomeTax(
        this.myThrivePreferences.financials.annualIncome - 
        this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);

    this.spTaxes.totalStateUnemploymentTaxes = this.getStateUnemployementTaxes_SP(
        this.myThrivePreferences.financials.annualIncome - 
        this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    
    this.spTaxes.total199ABenefit = this.get199ABenefit_SP(this.myThrivePreferences.financials.annualIncome);
    
    // Total tax liability
    this.spTaxes.totalTaxes = this.spTaxes.totalFederalTaxes + 
                              this.spTaxes.totalSelfEmploymentTaxes + 
                              this.spTaxes.totalStateIncomeTaxes + 
                              this.spTaxes.totalStateUnemploymentTaxes -
                              this.spTaxes.total199ABenefit;

    // console.log("Total SP tax liability: " + this.spTaxes.totalTaxes);
  }

  calculateSCorpTaxes() {
    // console.log("Calculating S-Corp Taxes");
    
    this.scorpTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax_SCorp(this.myThrivePreferences.financials.annualIncome);

    this.scorpTaxes.scheduleEIncome = this.myThrivePreferences.financials.annualIncome - 
        this.myThrivePreferences.financials.scorpSalary -
        0.5 * this.scorpTaxes.totalSelfEmploymentTaxes;

    this.scorpTaxes.totalFederalTaxes = this.getFederalIncomeTax(
        this.scorpTaxes.scheduleEIncome + 
        this.myThrivePreferences.financials.scorpSalary);
    // console.log("Schedule E: " + this.scorpTaxes.scheduleEIncome);
    // console.log("Salary: "+this.myThrivePreferences.financials.scorpSalary);
    
    let franchise_tax = Math.max(800, 0.015 * this.scorpTaxes.scheduleEIncome);    
  
    let state_income_tax = this.getStateIncomeTax(
        this.myThrivePreferences.financials.annualIncome - 
        this.PERCENTAGE_SE_TAX_DEDUCTION * this.scorpTaxes.totalSelfEmploymentTaxes);
    
    let state_unemp_tax = this.getStateUnemployementTaxes_SCorp(
      this.scorpTaxes.scheduleEIncome + this.myThrivePreferences.financials.scorpSalary);

    this.scorpTaxes.totalStateIncomeTaxes = state_income_tax + franchise_tax + state_unemp_tax;
    this.scorpTaxes.totalStateUnemploymentTaxes = state_unemp_tax;
    
    this.scorpTaxes.total199ABenefit = this.get199ABenefit_SCorp(this.myThrivePreferences.financials.annualIncome);
        
    this.scorpTaxes.totalTaxes = this.scorpTaxes.totalFederalTaxes + 
                                 this.scorpTaxes.totalSelfEmploymentTaxes + 
                                 this.scorpTaxes.totalStateIncomeTaxes - 
                                 this.scorpTaxes.total199ABenefit;

    // console.log("Total S Corp tax liability: " + this.scorpTaxes.totalTaxes);
  }

  calculateCCorpTaxes() {
    this.ccorpTaxes.totalTaxes = this.scorpTaxes.totalTaxes;
    // console.log("Calculating C-Corp Taxes");
    
    this.ccorpTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax_SP(this.myThrivePreferences.financials.annualIncome);
    this.ccorpTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.ccorpTaxes.totalStateIncomeTaxes = this.getStateIncomeTax(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.ccorpTaxes.totalStateUnemploymentTaxes = this.getStateUnemployementTaxes_SP(this.myThrivePreferences.financials.annualIncome - this.PERCENTAGE_SE_TAX_DEDUCTION * this.spTaxes.totalSelfEmploymentTaxes);
    this.ccorpTaxes.total199ABenefit = this.get199ABenefit_SP(this.myThrivePreferences.financials.annualIncome);
    // Total tax liability
    this.ccorpTaxes.totalTaxes = this.ccorpTaxes.totalFederalTaxes + 
                              this.ccorpTaxes.totalSelfEmploymentTaxes + 
                              this.ccorpTaxes.totalStateIncomeTaxes + 
                              this.ccorpTaxes.totalStateUnemploymentTaxes - 313 -
                              this.ccorpTaxes.total199ABenefit;
    // console.log(this.ccorpTaxes.totalTaxes);
  }

  incorporate() {
    this.router.navigate(['incorporate']);
  }

  // calculateLLCTaxes() {
  //   console.log("Calculating LLC Taxes");
  //   this.llcTaxes.totalFederalTaxes = this.getFederalIncomeTax(this.myThrivePreferences.financials.annualIncome);
  //   this.llcTaxes.totalSelfEmploymentTaxes = this.getSelfEmploymentTax(this.myThrivePreferences.financials.annualIncome);
  //   this.llcTaxes.totalTaxes = this.llcTaxes.totalFederalTaxes + this.llcTaxes.totalSelfEmploymentTaxes + this.llcTaxes.totalStateIncomeTaxes + this.llcTaxes.total199ABenefit;
  // }

  /***************************************************/
  /* Submit button functions to record income levels */
  /***************************************************/
  submitAnnualIncome() {
    this.myThrivePreferences.financials.annualIncome = parseInt(Number(
      12 * this.myThrivePreferences.financials.monthlyIncome).toFixed(2
    ));
    this.myThrivePreferences.financials.scorpSalary = 
      this.PERCENTAGE_INCOME_AS_SALARY * this.myThrivePreferences.financials.annualIncome;
    return
  }

  submitFinancialInformation() {
    this.myThrivePreferences.financials.monthlyIncome = parseFloat(Number(this.myThrivePreferences.financials.annualIncome / 12.0).toFixed(2));
    this.submitAnnualIncome();
    // console.log(this.myThrivePreferences.financials);

    this.calculateSPTaxes();
    this.calculateSCorpTaxes();
    this.calculateCCorpTaxes();
    // this.calculateLLCTaxes();

    this.calculating = true;

    window.scrollTo(0, 0);

    this.interval = setInterval( () => {
      this.calculating = false;
      this.submittedFinancials = true;
      clearInterval(this.interval);
    }, 3000);
  }

}
