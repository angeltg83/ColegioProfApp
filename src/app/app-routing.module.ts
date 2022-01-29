import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { CheckLoginGuard } from "@shared/guards/check-login.guard"
import { UsuarioComponent } from "@pages/usuario/usuario.component"
import { PerfilComponent } from "@pages/perfil/perfil.component"
import { ModuloComponent } from "@pages/modulo/modulo.component"
import { PermisoComponent } from "@pages/permiso/permiso.component"

// contable
import { IngresosCajaComponent } from "./pages/ingresos-caja/ingresos-caja.component"
import { IngresosDiariosRptComponent } from "./pages/reportes_contables/ingresos-diarios/ingresos-diarios.component"

const routes: Routes = [
  { path: "", loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule) },
  { path: "notFound", loadChildren: () => import("./pages/not-found/not-found.module").then((m) => m.NotFoundModule) },
  { path: "admin", loadChildren: () => import("./pages/admin/admin.module").then((m) => m.AdminModule) },
  {
    path: "login",
    loadChildren: () => import("./pages/auth/login/login.module").then((m) => m.LoginModule),
    canActivate: [CheckLoginGuard],
  },
  {
    path: "seguridad/usuario/listado",
    component: UsuarioComponent,
  },
  {
    path: "seguridad/rol/listado",
    component: PerfilComponent,
  },
  {
    path: "seguridad/modulo/listado",
    component: ModuloComponent,
  },
  {
    path: "seguridad/permiso/listado",
    component: PermisoComponent,
  },
  //Modulo Contable - Ingresos / Egresos.
  {
    path: "contable/ingresos-caja/listado",
    component: IngresosCajaComponent,
  },
  {
    path: "contable/reporte/ingresos-diario",
    component: IngresosDiariosRptComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
