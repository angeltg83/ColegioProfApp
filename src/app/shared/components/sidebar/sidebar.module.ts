import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

// import { MaterialModule } from '@app/material.module'
import { PrimeNgModule } from '@app/primeng.module'

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    //MaterialModule, 
    PrimeNgModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { 

}
