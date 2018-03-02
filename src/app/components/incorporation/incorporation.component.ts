import { Component, OnInit } from '@angular/core';
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
      "capitalContribution": 10000,
      "wagesDate": new Date(),
      "numberEmployees": 0,
      "heavyVehicle": false,
      "restrictedRetail": false,
      "businessLicense": true
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
}
