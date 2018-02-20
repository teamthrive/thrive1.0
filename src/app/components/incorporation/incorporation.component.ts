import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incorporation',
  templateUrl: './incorporation.component.html',
  styleUrls: ['./incorporation.component.css']
})
export class IncorporationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectedSection: number = 1;
  totalNumPages: number = 4;

  myThrivePreferences = {
    "incorpReasons": {
      "limitLiab": false,
      "simpTax": false,
      "professional": false,
      "business": false,
      "fundraise":false
    },
    "typeCorp": "scorp",
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
    if(this.selectedSection == 1) {
      this.router.navigate(['calculator']);
    }
    if(this.selectedSection > 1) {
      this.selectedSection = this.selectedSection - 1;
    }
  }
}
