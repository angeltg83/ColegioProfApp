import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { AuthService } from '../auth/auth.service';
import { RegistroProfesionalService } from '@app/services/registro-profesional.service';
import { GeneralService } from '@app/services/general.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro-profesional.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {

  constructor(private registroProfesional: RegistroProfesionalService,
    private generalService: GeneralService,
    private authService: AuthService) { }
  data: any;
  totalRecords: number = 0
  loading = false;
  rows: number = 10
  showModalEstadoCuenta: boolean = false
  form: any;
  first: number = 0
  permisoNuevo: any
  id_usuario: number = this.authService.getUser().id
  showModalFormProfesional: boolean = false
  modulo_id = 10
  id_seleccionado!: number
  ngOnInit(): void {
    this.permisoNuevo = this.generalService.getOpcions({ id_modulo: this.modulo_id, id_usuario: this.id_usuario, nombre: 'Nuevo profesional' })
  }

  loadUsers(event: LazyLoadEvent) {
    this.loading = true
    this.loadGrid(event?.filters, event.rows, event.first, this.modulo_id, this.authService.getUser().id)
  }

  loadGrid(condiciones: any, rows: number = 10, first: number = 0, id_modulo: number, id_usuario: number) {
    const p_pagina: number = ((first! / rows!)) + 1
    const params = { p_maximo: rows, p_pagina, condiciones, id_modulo, id_usuario }
    this.registroProfesional.getListRegistroProfesional(params).subscribe({
      next: ({ registros, total }) => {
        //const { data } = response
        this.data = registros
        this.totalRecords = total

      }, complete: () => this.loading = false
    })
  }

  handleAction(metodo: string, item: any) {
    // this.form = item
    this.id_seleccionado = item.id
    switch (metodo) {
      case 'verEstadoCuenta':
        this.showModalEstadoCuenta = true
        break;
    }
  }

  nuevoProfesional(): void {
    this.showModalFormProfesional = true
  }

  getStaus(visibleModal: boolean): void {
    this.showModalFormProfesional = visibleModal
    this.showModalEstadoCuenta = visibleModal;
    // this.showModalNuevoPerfil = visibleModal;
    // this.showModalVerPerfil = visibleModal;
  }

  refreshGrid() {
    this.loadGrid({}, this.rows, this.first, this.modulo_id, this.authService.getUser().id)
  }

}
