import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
// import { MenuItem } from 'primeng/api';
// import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component'

import { PrimeNgModule } from '@app/primeng.module';
import { MaterialModule } from '@app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module'

//Interceptor
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { UsuarioComponent } from '@pages/usuario/usuario.component';
import { PerfilComponent } from '@pages/perfil/perfil.component';
import { ModuloComponent } from '@pages/modulo/modulo.component'

//modules form
import { PerfilModule } from '@components/perfil/perfil.module'
import { UsuarioModule } from '@components/usuario/usuario.module';
import { PermisoModule } from '@components/permiso/permiso.module';
import { ModuloModule } from '@components/modulo/modulo.module';

//modules form CITA MEDICA
import { CitaMedicaModule } from './components/citaMedica/cita-medica.module';

// dialog dinamic
import { AsignacionPerfilComponent } from '@components/asignacion-perfil/asignacion-perfil.component'
import { RolesService } from '@services/roles.service';
import { PermisoComponent } from '@pages/permiso/permiso.component'

//modulo contable Ingresos de caja
import { IngresosCajaComponent } from './pages/ingresos-caja/ingresos-caja.component';
import { IngresosDiariosRptComponent } from "./pages/reportes_contables/ingresos-diarios/ingresos-diarios.component"

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    PerfilComponent,
    ModuloComponent,

    AsignacionPerfilComponent,
    PermisoComponent,
    //Contable
    IngresosCajaComponent,
    IngresosDiariosRptComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    MaterialModule,
    BrowserAnimationsModule,
    SidebarModule,
    /**
     * @desc Import modulo Seguridad
     */
    PerfilModule,
    UsuarioModule,
    PermisoModule,
    ModuloModule,

    /**
     * @desc imports modulo citas medicas
     */
    CitaMedicaModule,
  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, RolesService],
  bootstrap: [AppComponent],
  entryComponents: [AsignacionPerfilComponent]
})
export class AppModule { }
