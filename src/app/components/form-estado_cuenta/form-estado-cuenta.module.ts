import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEstadoCuentaComponent } from './form-estado-cuenta.component';

import { PrimeNgModule } from '../../primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FormEstadoCuentaComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [FormEstadoCuentaComponent],
})
export class FormEstadoCuentaModule { }
