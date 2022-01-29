import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';

import { PrimeNgModule } from '../../primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [UsuarioComponent],
})
export class UsuarioModule { }
