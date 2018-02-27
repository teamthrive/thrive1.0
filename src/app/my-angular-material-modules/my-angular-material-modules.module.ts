import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatCardModule,
    MatTooltipModule
  ],
  exports: [
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MyAngularMaterialModulesModule { }
