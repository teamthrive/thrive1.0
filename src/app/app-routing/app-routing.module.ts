import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncorporationComponent } from '../components/incorporation/incorporation.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  {
      path: 'incorporate',
      component: IncorporationComponent,
  },
  {
    path: 'home', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: '**', 
    component: HomeComponent
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