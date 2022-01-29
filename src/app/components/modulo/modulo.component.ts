import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';

import { RolesService } from '@app/services/roles.service';
import { UsuariosService } from '@app/services/usuarios.service'
import { AuthService } from '@app/pages/auth/auth.service';
import { MustMatch } from '@app/helpers/match-must.validator'
import { Observable } from 'rxjs';
import { AplicacionService } from '@app/services/aplicacion.service';
import { ModulosService } from '@app/services/modulos.service';

@Component({
  selector: 'app-form-modulo',
  templateUrl: './modulo.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./modulo.component.css'],
})
export class ModuloComponent implements OnInit {
  @Input() showModalModulo: boolean = false;
  @Input() tituloForm: string = '';
  @Input() id: any;
  @Input() tipo: string = "N";
  @Output() propagar = new EventEmitter<boolean>();
  @Output() refres = new EventEmitter<Boolean>();
  loading = false;
  moduloForm: FormGroup = new FormGroup({})
  selectedCity = []
  selectRol$!: any
  selectRolUsuario$!: any
  perfilElegidoSistema: string = ''
  perfilAsignadoUsuario: number = 0

  aplicacionSelect$!: Promise<any>
  moduloSelect$!: Promise<any>
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private rolService: RolesService,
    private authService: AuthService,
    private usuarioService: UsuariosService,

    private aplicacionService: AplicacionService,
    private moduloService: ModulosService,
  ) {
  }

  setFormReactive(form: any = {}) {
    this.moduloForm = new FormGroup({
      id_modulo: new FormControl(form.id_modulo || null),
      nombre: new FormControl(form.nombre || '', Validators.required),
      descripcion: new FormControl(form.descripcion || null),
      ruta_acceso: new FormControl(form.ruta_acceso || null),
      id_modulo_padre: new FormControl(form.id_modulo_padre || null),
      // tipo_modulo: new FormControl(form.tipo_modulo || '', Validators.required),
      id_aplicacion: new FormControl(form.id_aplicacion || null, Validators.required),
      icono: new FormControl(form.icono || null),
      orden: new FormControl(form.orden || null),
      nivel: new FormControl(form.nivel || null),
    });
  }

  ngOnInit(): void {
    this.setFormReactive()
    console.log(this.id)
    if (typeof this.id !== 'undefined') {
      this.moduloService.getModuloForm({ id: this.id }).subscribe(resp => this.setFormReactive(resp))
    }

    this.aplicacionSelect$ = this.aplicacionService.getAplicacionSelect()
    this.moduloSelect$ = this.aplicacionService.getModuloSelect()
  }

  insertUser(): void {
    if (this.moduloForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
      return
    }
    console.log(this.moduloForm.value)
    this.moduloService.insertModulo({ ...this.moduloForm.value }).subscribe({
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
    if (this.moduloForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
    }
    this.moduloService.updateModulo({ ...this.moduloForm.value }).subscribe({
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
    console.log(this.moduloForm.valid)
    if (this.tipo === 'N') {
      this.insertUser()
    } else {
      this.updateUser()

    }

  }
  onPropagar(): void {
    this.showModalModulo = false;
    this.propagar.emit(false);
  }

  onRefresGrid(): void {
    this.refres.emit(true);
  }

  onHide(): void {
    this.onPropagar();
  }
}
