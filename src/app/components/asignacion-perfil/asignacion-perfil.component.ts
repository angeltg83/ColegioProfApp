import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { RolesService } from '@app/services/roles.service';
@Component({
  selector: 'app-asignacion-perfil',
  templateUrl: './asignacion-perfil.component.html',
  styleUrls: ['./asignacion-perfil.component.css']
})
export class AsignacionPerfilComponent implements OnInit {
  selectRol$!: any
  selectRolUsuario$!: any

  perfilElegido: number = 0
  rolAsignadoUsuario: number = 0
  id_usuario: number = 0
  constructor(private rolService: RolesService,
    private messageService: MessageService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id_usuario = this.config.data.id
    this.rolService.selectRoles().subscribe({
      next: (resp) => {
        this.selectRol$ = resp['data']
      }
    })

    this.obtenerRolesUsuario(this.id_usuario)
  }

  obtenerRolesUsuario(id: number | undefined): void {
    this.rolService.selectRoles({ id }).subscribe({
      next: (resp) => {
        console.log(resp)
        this.selectRolUsuario$ = resp['data']
      }
    })
  }

  asignarPerfilUsuario(): void {

    console.log(this.perfilElegido)
    if (typeof this.perfilElegido === 'undefined' || this.perfilElegido === null || this.perfilElegido === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar el rol para continuar' });
      return
    }
    this.rolService.asignPerfilUsuario({ perfil: this.perfilElegido, id_usuario: this.id_usuario }).subscribe({
      next: (response: any) => {
        const { msg, severity, summary } = response
        this.messageService.add({ severity, summary, detail: msg });
        this.obtenerRolesUsuario(this.id_usuario)

      },
    
    })

  }

  eliminarPerfilUsuario(): void {
    if (typeof this.rolAsignadoUsuario === 'undefined' || this.rolAsignadoUsuario === null || this.rolAsignadoUsuario === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar el rol del usuario para continuar' });
      return
    }
    this.rolService.eliminarPerfilUsuario({ perfil: this.rolAsignadoUsuario, id_usuario: this.id_usuario }).subscribe({
      next: (response: any) => {
        const { msg, severity, summary } = response
        this.messageService.add({ severity, summary, detail: msg });
        this.obtenerRolesUsuario(this.id_usuario)

      },
      complete: () => {
        console.log('completo!')
      }
    })

  }



}
