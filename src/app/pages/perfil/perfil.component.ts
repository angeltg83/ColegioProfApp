import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { RolesService } from '@services/roles.service'
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private rolService: RolesService, private authService: AuthService) { }
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

    this.loadGrid(event?.filters, event.rows, event.first, 2, this.authService.getUser().id)
    // const p_pagina: number = ((event.first! / event.rows!)) + 1
    // const condiciones = event?.filters
    // const params = { p_maximo: event.rows, p_pagina, condiciones, id_modulo: 2, id_usuario: this.authService.getUser().id }
    // this.rolService.getRoles(params).subscribe({
    //   next: (response: any) => {
    //     const { data } = response
    //     this.data = data[0].registros
    //     this.totalRecords = data[0].total

    //   }, complete: () => this.loading = false
    // })

  }

  loadGrid(condiciones: any, rows: number = 10, first: number = 0, id_modulo: number, id_usuario: number) {
    const p_pagina: number = ((first! / rows!)) + 1
    const params = { p_maximo: rows, p_pagina, condiciones, id_modulo, id_usuario }
    this.rolService.getRoles(params).subscribe({
      next: (response: any) => {
        const { data } = response
        this.data = data[0].registros
        this.totalRecords = data[0].total

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
