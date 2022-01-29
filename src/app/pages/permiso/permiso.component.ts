import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { GeneralService } from '@app/services/general.service';
import { PermisosService } from '@app/services/permisos.service';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./permiso.component.css']
})
export class PermisoComponent implements OnInit {
  loading: boolean = false
  id_modulo = 4 //Permisos
  id_usuario = this.authService.getUser().id
  data: any
  totalRecords: number = 0
  permisoNuevo!: Promise<boolean>;
  showModalNuevoPermiso: boolean = false;

  constructor(private permisoService: PermisosService, private authService: AuthService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.permisoNuevo = this.generalService.getOpcions({ id_modulo: this.id_modulo, id_usuario: this.id_usuario, nombre: 'Nuevo' })
  }

  loadPermisos(event: LazyLoadEvent) {
    this.loading = true
    const p_pagina: number = ((event.first! / event.rows!)) + 1
    const condiciones = event?.filters
    const params = { p_maximo: event.rows, p_pagina, condiciones, id_modulo: this.id_modulo, id_usuario: this.id_usuario }
    this.permisoService.getPermisoListado(params).subscribe({
      next: (response: any) => {
        const { data } = response
        this.data = data.registros
        this.totalRecords = data.total

      }, complete: () => this.loading = false
    })

  }

  handleAction(metodo: string, item: any) {
    // this.form = item
    switch (metodo) {
      case 'editarPerfil':
        //   this.showModalEditarPerfil = true
        break;
      case 'verPerfil':
        // this.showModalVerPerfil = true
        break;
    }
  }

  getStaus(status: boolean) {
    this.showModalNuevoPermiso = status
  }
}
