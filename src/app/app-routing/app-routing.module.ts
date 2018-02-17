import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalculatorComponent } from '../components/calculator/calculator.component';
import { IncorporationComponent } from '../components/incorporation/incorporation.component';
import { HomeComponent } from '../components/home/home.component';
import { PricingComponent } from '../components/pricing/pricing.component';
import { FeaturesComponent } from '../components/features/features.component';
import { ComparisonsComponent } from "../components/comparisons/comparisons.component";

const routes: Routes = [
  {
    path: 'comparisons',
    component: ComparisonsComponent,
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  },
  {
    path: 'incorporate',
    component: IncorporationComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'features',
    component: FeaturesComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: '**', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  } 
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }