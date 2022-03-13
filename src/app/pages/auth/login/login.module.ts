import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { LoginRoutingModule } from "./login-routing.module"
import { LoginComponent } from "./login.component"
import { MaterialModule } from "@app/material.module"
import { ReactiveFormsModule } from "@angular/forms"
import { PrimeNgModule } from "@app/primeng.module"
import { ResetContrasenaModule } from "@components/resetContrasena/resetContrasena.module"

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PrimeNgModule,
    ResetContrasenaModule,
  ],
})
export class LoginModule {}
