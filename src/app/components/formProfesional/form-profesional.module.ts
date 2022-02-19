import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProfesionalComponent } from './form-profesional.component';

import { PrimeNgModule } from '../../primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FormProfesionalComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [FormProfesionalComponent],
})
export class FormProfesionalModule { }
