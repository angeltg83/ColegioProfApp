import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';

import { RolesService } from '@app/services/roles.service';
import { UsuariosService } from '@app/services/usuarios.service'
import { AuthService } from '@app/pages/auth/auth.service';
import { MustMatch } from '@app/helpers/match-must.validator'

@Component({
  selector: 'app-form-usuario',
  templateUrl: './usuario.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  @Input() showModalNuevoUsuario: boolean = false;
  @Input() tituloForm: string = '';
  @Input() form: any;
  @Input() tipo: string = "N";
  @Output() propagar = new EventEmitter<boolean>();
  @Output() refres = new EventEmitter<Boolean>();
  loading = false;
  usuarioForm: FormGroup = new FormGroup({})
  selectedCity = []
  selectRol$!: any
  selectRolUsuario$!: any
  perfilElegidoSistema: string = ''
  perfilAsignadoUsuario: number = 0
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private rolService: RolesService,
    private authService: AuthService,
    private usuarioService: UsuariosService
  ) {
  }

  setFormReactive(form: any = {}) {
    let arrayCampoPass = [Validators.required, Validators.minLength(6)]
    let arrayCampoRepPass = [Validators.required]
    let jsonVal = {
      validator: MustMatch('password', 'repeatPassword')
    }

    if (this.tipo !== 'N') {
      arrayCampoPass = []
      arrayCampoRepPass = []
    }

    console.log(form.estado_registro)
    this.usuarioForm = this.fb.group({
      id: new FormControl(form?.id || null),
      nombres: [form?.nombres, Validators.required],
      username: [form?.username, Validators.required],
      apellidos: [form?.apellidos, Validators.required],
      email: [form?.email || '', Validators.required],
      password: [form?.password || '', arrayCampoPass],
      repeatPassword: ['', arrayCampoRepPass],
      estado_registro: [ form?.estado_registro ],
    },
      (this.tipo === 'N') ? jsonVal?.validator : {}
    );


  }

  ngOnInit(): void {
    this.setFormReactive()
    const { id } = this.authService.getUser()
    if (typeof this.form !== 'undefined') {
      this.setFormReactive(this.form)
    }

  }

  insertUser(): void {
    if (this.usuarioForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
      return
    }
    console.log(this.usuarioForm.value)
    this.usuarioService.insertUser({ ...this.usuarioForm.value }).subscribe({
      next: response => {
        const { msg, severity } = response
        console.log(msg)
        this.messageService.add({ severity, summary: 'Exito', detail: msg });
      },
      complete: () => {
        setTimeout(() => {
          this.onHide()
        }, 1200)
      },
      error: (err) => {
        console.log('err', err)
        const { error } = err
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.msg });
        return
      }
    })
  }

  updateUser(): void {
    if (this.usuarioForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
    }
    this.usuarioService.updateUser({ ...this.usuarioForm.value }).subscribe({
      next: ({ msg }) => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: msg });
      },
      complete: () => {
        setTimeout(() => {
          this.onHide()
          this.refres.emit(true);
        }, 1500)
      }, error: (err) => {
        const { error } = err
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.msg });
        return
      }
    })
  }
  onSubmit(): void {
    console.log(this.usuarioForm.valid)
    if (this.tipo === 'N') {
      this.insertUser()
    } else {
      this.updateUser()

    }

  }
  onPropagar(): void {
    this.showModalNuevoUsuario = false;
    this.propagar.emit(false);
  }

  onRefresGrid(): void {
    this.refres.emit(true);
  }

  onHide(): void {
    this.onPropagar();
  }
}
