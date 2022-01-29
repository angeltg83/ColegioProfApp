import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { ModulosService } from '@services/modulos.service'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {

  constructor(private moduloService: ModulosService, private authService: AuthService) { }
  data: any;
  totalRecords: number = 0
  loading = false;
  rows: number = 10
  showModalNuevoModulo: boolean = false
  id_usuario: number = this.authService.getUser().id
  id_modulo: number = 3
  id!: number
  showEditarModulo: boolean = false
  ngOnInit(): void {
  }

  loadModulos(event: LazyLoadEvent) {
    this.loading = true

    const p_pagina: number = ((event.first! / event.rows!)) + 1
    const condiciones = event?.filters
    const params = { p_maximo: event.rows, p_pagina, condiciones, id_modulo: this.id_modulo, id_usuario: this.id_usuario }

    this.moduloService.getModulos(params).subscribe({
      next: ({ data }) => {
        this.data = data[0].registros
        this.totalRecords = data[0].total

      }, complete: () => this.loading = false
    })

  }

  getStaus(statusModal: boolean) {
    this.showModalNuevoModulo = statusModal
    this.showEditarModulo = statusModal
  }

  handleAction(metodo: string, item: any) {
    this.id = item.id
    console.log(metodo)
    switch (metodo) {
      case 'editarModulo':
        this.showEditarModulo = true
        break;

      default:
        break;
    }
  }
}
