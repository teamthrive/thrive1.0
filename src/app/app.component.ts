import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Thrive';
  selectedSection: number = 1;

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
    if(this.selectedSection > 1) {
      this.selectedSection = this.selectedSection - 1;
    }
  }
}