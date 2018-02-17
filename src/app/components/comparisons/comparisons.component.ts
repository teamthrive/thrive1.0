import { Component, OnInit } from '@angular/core';
import { FinancialService } from "../../services/financial.service";

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.css']
})
export class ComparisonsComponent implements OnInit {

  message:string;

  constructor(private data: FinancialService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

}
