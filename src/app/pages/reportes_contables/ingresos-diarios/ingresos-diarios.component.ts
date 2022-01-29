import { Component, OnInit } from "@angular/core"
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog"
import { MessageService, ConfirmationService, LazyLoadEvent } from "primeng/api"

import { AsignacionPerfilComponent } from "@app/components/asignacion-perfil/asignacion-perfil.component"
import { UsuariosService } from "@services/usuarios.service"
import { AuthService } from "@auth/auth.service"
import { GeneralService } from "@app/services/general.service"
//import { IngresosCajaService } from "@app/services/ingresos-caja.service"

import { RptIngresosDiarioService } from "@app/services/reporte-ingresos-diario.service"
import { saveAs } from 'file-saver';

@Component({
  selector: "app-rpt-ingresos-diario",
  templateUrl: "./ingresos-diarios.component.html",
  providers: [MessageService, ConfirmationService, DialogService],
  styleUrls: ["./ingresos-diarios.component.css"],
})
export class IngresosDiariosRptComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private rptIngresosDiarioService: RptIngresosDiarioService,
    private messageService: MessageService,
  ) { }
  data: any
  loading = false
  id_usuario: number = this.authService.getUser().id
  permisoNuevo: any
  showModalEditUser: boolean = false
  form: any
  showModalVerUser: boolean = false

  selectUsuarios$!: Promise<any>
  usuarioSeleccionado!: number
  fechaSeleccionada!: Date
  totalRecords: number = 0

  ngOnInit(): void {
    this.selectUsuarios$ = this.rptIngresosDiarioService.getSelectUsuario()
  }

  getReporte() {

    console.log(this.fechaSeleccionada)
    if (typeof this.fechaSeleccionada === 'undefined') {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
      return
    }

    if (typeof this.usuarioSeleccionado === 'undefined') {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
      return
    }

    this.rptIngresosDiarioService.getReporteIngresoDiario({ usuario_id: this.usuarioSeleccionado, fecha: this.fechaSeleccionada }).subscribe({
      next: response => {
        const byteArray = new Uint8Array(atob(response).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: 'application/pdf' })
        saveAs(blob, 'reporte-diario.pdf');
      },
      complete: () => {
        setTimeout(() => {
          //this.onHide()
          console.log('finish!')
        }, 2000)
      },
      error: (err: any) => {
        console.log('err', err)
        let { error } = err
        error = JSON.parse(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.msg });
        return
      }
    })
  }

  crearCierreDiario() {
    console.log(this.fechaSeleccionada)
    if (typeof this.fechaSeleccionada === 'undefined') {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
      return
    }

    if (typeof this.usuarioSeleccionado === 'undefined') {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
      return
    }

    this.rptIngresosDiarioService.crearCierrreDiario({ usuario_id: this.usuarioSeleccionado, fecha: this.fechaSeleccionada }).subscribe({
      next: response => {
        const byteArray = new Uint8Array(atob(response).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: 'application/pdf' })
        saveAs(blob, 'reporte-diario.pdf');
      },
      complete: () => {
        setTimeout(() => {
          //this.onHide()
          console.log('finish!')
        }, 2000)
      },
      error: (err: any) => {
        console.log('err', err)
        let { error } = err
        error = JSON.parse(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.msg });
        return
      }
    })

  }


  loadListadoArqueo(event: LazyLoadEvent) {
    this.loading = true
    this.loadGrid(event?.filters, event.rows, event.first, 13, this.authService.getUser().id)
  }

  loadGrid(condiciones: any, rows: number = 10, first: number = 0, id_modulo: number, id_usuario: number) {
    const p_pagina: number = ((first! / rows!)) + 1
    const params = { p_maximo: rows, p_pagina, condiciones, id_modulo, id_usuario }
    this.rptIngresosDiarioService.getListadoArqueo(params).subscribe({
      next: (response: any) => {
        console.log(response)
        const { data } = response

        this.data = data.registros
        this.totalRecords = data.total

      }, complete: () => this.loading = false
    })
  }

  obtenerPdfIngresosDiario(id: number) {
    this.rptIngresosDiarioService.getReporteXIDIngresoDiario({ id }).subscribe({
      next: response => {
        const byteArray = new Uint8Array(atob(response).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: 'application/pdf' })
        saveAs(blob, 'reporte-historial-ingresos-diarios.pdf');
      },
      complete: () => {
        setTimeout(() => {
          //this.onHide()
          console.log('finish!')
        }, 2000)
      },
      error: (err: any) => {
        console.log('err', err)
        let { error } = err
        error = JSON.parse(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.msg });
        return
      }
    })
  }

  handleAction(metodo: string, item: any) {
    console.log(metodo, item)
    const { id } = item
    switch (metodo) {
      case "verPdf":
        this.obtenerPdfIngresosDiario(id)
        break

    }
  }


}
