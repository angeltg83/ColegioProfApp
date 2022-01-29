import { Component, OnInit } from "@angular/core"
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog"
import { MessageService, ConfirmationService, LazyLoadEvent } from "primeng/api"

import { AsignacionPerfilComponent } from "@app/components/asignacion-perfil/asignacion-perfil.component"
import { UsuariosService } from "@services/usuarios.service"
import { AuthService } from "../auth/auth.service"
import { GeneralService } from "@app/services/general.service"
import { IngresosCajaService } from "@app/services/ingresos-caja.service"

@Component({
  selector: "app-ingresos-caja",
  templateUrl: "./ingresos-caja.component.html",
  providers: [MessageService, ConfirmationService, DialogService],
  styleUrls: ["./ingresos-caja.component.css"],
})
export class IngresosCajaComponent implements OnInit {
  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private dialogService: DialogService,
    private generalService: GeneralService,

    private ingresoCajaService: IngresosCajaService
  ) { }
  data: any
  totalRecords: number = 0
  loading = false
  rows: number = 10
  showModalNuevoUser: boolean = false
  products: any
  id_usuario: number = this.authService.getUser().id
  permisoNuevo: any
  showModalEditUser: boolean = false
  form: any
  showModalVerUser: boolean = false

  ngOnInit(): void {
    this.permisoNuevo = this.generalService.getOpcions({ id_modulo: 1, id_usuario: this.id_usuario, nombre: "Nuevo" })
  }

  ref!: DynamicDialogRef

  loadIngresoCaja(event: LazyLoadEvent) {
    this.loading = true
    const p_pagina: number = event.first! / event.rows! + 1
    const condiciones = event?.filters
    this.getLoadGrid(condiciones, event.rows, p_pagina, 10, this.id_usuario)
  }

  visualizarFormUsuario(): void {
    this.showModalNuevoUser = true
  }

  getRefreshModal(event: any) {
    this.getLoadGrid({}, this.rows, 1, 10, this.id_usuario)
  }

  getStaus(visibleModal: boolean): void {
    this.showModalNuevoUser = visibleModal
    this.showModalEditUser = visibleModal
    this.showModalVerUser = visibleModal
  }

  getLoadGrid(
    condiciones: any,
    p_maximo: number | undefined = 10,
    p_pagina: number,
    id_modulo: number,
    id_usuario: number
  ) {
    const params = { p_maximo, p_pagina, condiciones, id_modulo, id_usuario }
    this.ingresoCajaService.getListIngresosCaja(params).subscribe({
      next: ({ registros, total }) => {
        this.data = registros
        this.totalRecords = total
      },
      complete: () => (this.loading = false),
    })
  }

  getRefresh(refresh: Boolean) {
    if (refresh) {
      this.getLoadGrid({}, this.rows, 1, 10, this.id_usuario)
    }
  }

  handleAction(metodo: string, item: any) {
    console.log(metodo)
    this.form = item
    switch (metodo) {
      case "asignarPerfil":
        this.modalAsignarPerfil(item)
        break
      case "editarUsuario":
        this.showModalEditUser = true
        break
      case "verUsuario":
        this.showModalVerUser = true
        break
    }
  }

  modalAsignarPerfil(item: any) {
    const { id } = item
    this.ref = this.dialogService.open(AsignacionPerfilComponent, {
      data: { id },
      header: "Asignación rol al usuario",
      width: "700px",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
    })
  }
}
