import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoComponent } from './permiso.component';

import { PrimeNgModule } from '../../primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PermisoComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [PermisoComponent],
})
export class PermisoModule { }
