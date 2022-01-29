import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { AsignacionPerfilComponent } from '@app/components/asignacion-perfil/asignacion-perfil.component'
import { UsuariosService } from '@services/usuarios.service'
import { AuthService } from '../auth/auth.service';
import { GeneralService } from '@app/services/general.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  providers: [MessageService, ConfirmationService, DialogService],
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private dialogService: DialogService,
    private generalService: GeneralService
  ) { }
  data: any;
  totalRecords: number = 0
  loading = false;
  rows: number = 10
  showModalNuevoUser: boolean = false;
  products: any;
  id_usuario: number = this.authService.getUser().id
  permisoNuevo: any;
  showModalEditUser: boolean = false
  form: any
  showModalVerUser: boolean = false
  ngOnInit(): void {
    this.permisoNuevo = this.generalService.getOpcions({ id_modulo: 1, id_usuario: this.id_usuario, nombre: 'Nuevo' })
  }

  ref!: DynamicDialogRef;

  loadUsers(event: LazyLoadEvent) {
    this.loading = true
    const p_pagina: number = ((event.first! / event.rows!)) + 1
    const condiciones = event?.filters
    this.getLoadGrid(condiciones, event.rows, p_pagina, 1, this.id_usuario)
  }

  visualizarFormUsuario(): void {
    this.showModalNuevoUser = true;
  }

  getStaus(visibleModal: boolean): void {
    this.showModalNuevoUser = visibleModal;
    this.showModalEditUser = visibleModal;
    this.showModalVerUser = visibleModal;
  }

  getLoadGrid(condiciones: any, p_maximo: number | undefined = 10, p_pagina: number, id_modulo: number, id_usuario: number) {
    const params = { p_maximo, p_pagina, condiciones, id_modulo, id_usuario }
    this.usuarioService.getUsuarios(params).subscribe({
      next: (response: any) => {
        const { data } = response
        this.data = data[0].registros
        this.totalRecords = data[0].total
      }, complete: () => this.loading = false
    })
  }

  getRefresh(refresh: Boolean) {
    if (refresh) {
      this.getLoadGrid({}, this.rows, 1, 1, this.id_usuario)
    }
  }

  handleAction(metodo: string, item: any) {
    console.log(metodo)
    this.form = item
    switch (metodo) {
      case 'asignarPerfil':
        this.modalAsignarPerfil(item)
        break;
      case 'editarUsuario':
        this.showModalEditUser = true
        break;
      case 'verUsuario':
        this.showModalVerUser = true
        break;
    }
  }

  modalAsignarPerfil(item: any) {
    const { id } = item
    this.ref = this.dialogService.open(AsignacionPerfilComponent, {
      data: { id },
      header: 'Asignación rol al usuario',
      width: '700px',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });


  }

}
