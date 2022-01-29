import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';

import { RolesService } from '@app/services/roles.service';
import { UsuariosService } from '@app/services/usuarios.service'
import { AuthService } from '@app/pages/auth/auth.service';
import { PermisosService } from '@app/services/permisos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-permiso',
  templateUrl: './permiso.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./permiso.component.css'],
})
export class PermisoComponent implements OnInit {
  @Input() showModalNuevoPermiso: boolean = false;
  @Input() tituloForm: string = '';
  @Input() form: any;
  @Input() tipo: string = "N";
  @Output() propagar = new EventEmitter<boolean>();
  @Output() refres = new EventEmitter<Boolean>();
  loading = false;
  permisoForm: FormGroup = new FormGroup({})
  selectedCity = []
  selectRol$!: any
  selectRolUsuario$!: any
  perfilElegidoSistema: string = ''
  perfilAsignadoUsuario: number = 0
  permisosSelect$!: Promise<any>
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private rolService: RolesService,
    private authService: AuthService,
    private permisosService: PermisosService
  ) {
  }

  setFormReactive(form: any = {}) {
    this.permisoForm = new FormGroup({
      id: new FormControl(form?.id || null),
      nombre: new FormControl(form?.nombre || null, Validators.required),
      descripcion: new FormControl(form?.descripcion || null),
      modulo: new FormControl(form?.id_modulo || null, Validators.required),
      estado_registro: new FormControl(form?.estado_registro || null),

    });

  }

  ngOnInit(): void {

    this.permisosSelect$ = this.permisosService.getModuloSelect();

    console.log('form', this.authService.getUser())
    this.setFormReactive()
    const { id } = this.authService.getUser()
    if (typeof this.form !== 'undefined') {
      this.setFormReactive(this.form)
    }
    this.rolService.selectRoles().subscribe({
      next: (resp) => {
        this.selectRol$ = resp['data']
      }
    })

    this.rolService.selectRoles({ id }).subscribe({
      next: (resp) => {
        console.log(resp)
        this.selectRolUsuario$ = resp['data']
      }
    })

  }

  /**
   * @desc Invoca al service para insert el nuevo id perfil al nuevo usuario
   */
  asignarPerfilUsuario(): void {

    this.rolService.selectRoles().subscribe({
      next: (resp) => {
        this.selectRol$ = resp['data']
      }
    })

  }




  onPropagar(): void {
    this.showModalNuevoPermiso = false;
    this.propagar.emit(false);
  }

  onRefresGrid(): void {
    this.refres.emit(true);
  }

  onHide(): void {
    this.onPropagar();
  }

  onSubmit() {
    if (this.permisoForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debe ingresar la información requerida' });
      return
    }

    if (this.tipo === 'N') {
      this.permisosService.insertPermiso({ ...this.permisoForm.value }).subscribe({
        next: ({ msg }) => {
          console.log(msg)
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: msg });
        },
        complete: () => { this.onHide() }
      })
    }



  }
}
