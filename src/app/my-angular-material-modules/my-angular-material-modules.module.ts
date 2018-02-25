import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { 
  MatInputModule, 
  MatCheckboxModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule
  ],
  exports: [
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule
  ],
  declarations: []
})
export class MyAngularMaterialModulesModule { }
