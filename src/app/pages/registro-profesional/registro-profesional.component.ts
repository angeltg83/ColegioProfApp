import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { AuthService } from '../auth/auth.service';
import { RegistroProfesionalService } from '@app/services/registro-profesional.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro-profesional.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {

  constructor(private registroProfesional: RegistroProfesionalService,
    private authService: AuthService) { }
  data: any;
  totalRecords: number = 0
  loading = false;
  rows: number = 10
  showModalNuevoPerfil: boolean = false
  showModalEditarPerfil: boolean = false
  showModalVerPerfil: boolean = false
  form: any;
  first: number = 0
  ngOnInit(): void {
  }

  loadUsers(event: LazyLoadEvent) {
    this.loading = true
    this.loadGrid(event?.filters, event.rows, event.first, 10, this.authService.getUser().id)
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
    this.form = item
    switch (metodo) {
      case 'editarPerfil':
        this.showModalEditarPerfil = true
        break;
      case 'verPerfil':
        this.showModalVerPerfil = true
        break;
    }
  }

  visualizarFormPerfil(): void {
    this.showModalNuevoPerfil = true;
  }

  getStaus(visibleModal: boolean): void {
    this.showModalNuevoPerfil = visibleModal;
    this.showModalEditarPerfil = visibleModal;
    this.showModalVerPerfil = visibleModal;
  }

  refreshGrid() {
    this.loadGrid({}, this.rows, this.first, 2, this.authService.getUser().id)
  }

}
