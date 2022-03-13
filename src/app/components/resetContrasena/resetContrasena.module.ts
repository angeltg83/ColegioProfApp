import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetContrasenaComponent } from './resetContrasena.component';

import { PrimeNgModule } from '../../primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ResetContrasenaComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
  exports: [ResetContrasenaComponent],
})
export class ResetContrasenaModule { }
