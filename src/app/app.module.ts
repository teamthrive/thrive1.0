import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing/app-routing.module";

//Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MyAngularMaterialModulesModule } from "./my-angular-material-modules/my-angular-material-modules.module";

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { HeaderComponent } from './components/header/header.component';
import { IncorporationComponent } from "./components/incorporation/incorporation.component";
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FeaturesComponent } from './components/features/features.component';
import { ComparisonsComponent } from './components/comparisons/comparisons.component';

import { FinancialService } from "./services/financial.service";

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    HeaderComponent,
    IncorporationComponent,
    HomeComponent,
    FooterComponent,
    PricingComponent,
    FeaturesComponent,
    ComparisonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyAngularMaterialModulesModule
  ],
  providers: [FinancialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
