import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAngularMaterialModulesModule } from "../../my-angular-material-modules/my-angular-material-modules.module";

@Component({
  selector: 'app-incorporation',
  templateUrl: './incorporation.component.html',
  styleUrls: ['./incorporation.component.css']
})
export class IncorporationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  objectKeys = Object.keys

  selectedSection: number = 1;
  totalNumPages: number = 1;

  myThrivePreferences = {
    "typeCorp": "scorp",
    "corpInfo": {
      "name": "",
      "email": "",
      "legalName": "",
      "tradeName": "",
      "workType": "Real Estate Agent",
      "purpose": "",
      "organizer": "",
      "address1": "",
      "address2": "",
      "city": "",
      "state": "",
      "zip": "",
      "capitalContribution": 5000,
      "wagesDate": new Date(),
      "numberEmployees": 0,
      "heavyVehicle": false,
      "restrictedRetail": false,
      "businessLicense": true
    },
    "ccInfo": {
      "ccName": "",
      "ccNumber": "",
      "ccExp": "",
      "xCardCode": "",
      "xZip": ""
    }
  }

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
    "Other Professional",
    "Other Non-Professional"
  ]

  TRUE_FALSE = {
    "Yes": true,
    "No": false
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

  nextClicked() {
    this.selectedSection = this.selectedSection + 1;
    window.scrollTo(0, 0);
  }

  prevClicked() {
    if(this.selectedSection == 1) {
      this.router.navigate(['calculator']);
    }
    if(this.selectedSection > 1) {
      this.selectedSection = this.selectedSection - 1;
    }
    window.scrollTo(0, 0);
  }

  businessPurposeDisabled() {
    return ["Tradesman", "Other Professional", "Other Non-Professional"].includes(
        this.myThrivePreferences.corpInfo.workType);
  }

  onSubmit(cardFormObject: NgForm) {
    if (!cardFormObject.valid) {
      for (var control in cardFormObject.controls) {
        (<FormControl>cardFormObject.controls[control]).markAsDirty();
      }
    } else {
      this.router.navigate(["submitted"]);
    }
  }
}
