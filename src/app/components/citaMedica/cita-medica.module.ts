import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaMedicaComponent } from './cita-medica.component';

import { PrimeNgModule } from '../../primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CitaMedicaComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [CitaMedicaComponent],
})
export class CitaMedicaModule { }
