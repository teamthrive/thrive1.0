import { Component, OnInit } from '@angular/core';
import { ContactService } from "../../services/contact.service";

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.css']
})
export class ComparisonsComponent implements OnInit {

  message:string;

  constructor(private data: ContactService) { }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message => this.message = message)
  }

}
