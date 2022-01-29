import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms'
import { MessageService, ConfirmationService } from 'primeng/api';
import { saveAs } from 'file-saver';
import { UsuariosService } from '@app/services/usuarios.service'
import { CitasMedicasService } from '@app/services/citas-medicas.service';


@Component({
  selector: 'app-form-cita-medica',
  templateUrl: './cita-medica.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./cita-medica.component.css'],
})
export class CitaMedicaComponent implements OnInit {
  @Input() showModalNuevoUsuario: boolean = false;
  @Input() tituloForm: string = '';
  @Input() form: any;
  @Input() tipo: string = "N";
  @Output() propagar = new EventEmitter<boolean>();
  @Output() refres = new EventEmitter<Boolean>();
  loading = false;
  ingresoCajaForm: FormGroup = new FormGroup({})

  DoctorSelect$!: Promise<any>
  getListHorariosDisp$!: Promise<any>
  getHorarioDoct$!: Promise<any>

  tipo_consulta_select$!: Promise<any>
  forma_pago_select$!: Promise<any>
  tipo_identificacion$: any = [{ id: 1, descripcion: "Cédula" }, { id: 2, descripcion: "R.U.C." }]

  hpagos: FormArray = new FormArray([this.createItem()])
  validatorIdentificacion = [Validators.required]
  fecha_minina_cita_nueva = new Date()

  fecha_reserva_temp!: Date
  es: any
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private citasMedicaService: CitasMedicasService,
  ) {
  }

  ngOnInit(): void {
    this.DoctorSelect$ = this.citasMedicaService.getSelectDoctor()
    this.tipo_consulta_select$ = this.citasMedicaService.getTipoConsulta()
    this.forma_pago_select$ = this.citasMedicaService.getTipoFormaPago()

    this.setFormReactive()
    if (typeof this.form !== 'undefined') {
      this.setFormReactive(this.form)
    }
    //this.addItem()
  }


  setFormReactive(form: any = {}) {

    this.ingresoCajaForm = new FormGroup({
      tipoIdentificacion: new FormControl(form?.tipoIdentificacion || '', [Validators.required]),

      identificacion: new FormControl(form?.identificacion || '', this.validatorIdentificacion),

      nombres: new FormControl(form?.nombres || '', [Validators.required]),
      apellidos: new FormControl(form?.apellidos || '', [Validators.required]),
      fecha_nacimiento: new FormControl(form?.fecha_nacimiento || null, [Validators.required]),
      correo: new FormControl(form?.correo || '', [Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10)]),
      direccion: new FormControl(form?.direccion || '', [Validators.required]),
      tipo_consulta: new FormControl(form.tipo_consulta || null, [Validators.required]),
      doctor_id: new FormControl(form.doctor_id || null, [Validators.required]),
      fecha_reserva: new FormControl(form?.fecha_reserva || new Date(), [Validators.required]),
      horarios_disponibles: new FormControl(null),

      hpagos: this.fb.array([this.createItem()])

    })

  }

  getHorarioDoctor({ value }: any) {
    this.getHorarioDoct$ = this.citasMedicaService.getHorarioDoctor({ doctor_id: value })
  }

  getHorariosDisponibles(value: Date, doctor_id: number) {
    this.getListHorariosDisp$ = this.citasMedicaService.getHorariosDisponibles({ fecha_reserva: value, doctor_id })
  }

  cambioTipoIdentificacion(event: any) {
    console.log(event)
    const { value } = event
    if (value === 1) {
      console.log('entro!')
      this.ingresoCajaForm.get('identificacion')?.setValidators(Validators.maxLength(10))
    } else {
      this.ingresoCajaForm.get('identificacion')?.setValidators(Validators.maxLength(13))
    }
  }

  getHorarioDiponibleXDia(event: any) {
    console.log(event)
    const doctor_id = this.ingresoCajaForm.get('doctor_id')?.value
    if (doctor_id === null) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debe seleccionar un doctor' });
      return
    }
    this.getHorariosDisponibles(event, doctor_id)
  }

  insertNuevaCita(): void {
    console.log(this.ingresoCajaForm.value)
    if (this.ingresoCajaForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Hay campos obligatorios requeridos' });
      return
    }
    const consto_asist_med: number = parseFloat(this.ingresoCajaForm?.value?.tipo_consulta?.valor) || 0

    if (typeof this.ingresoCajaForm?.value?.tipo_consulta !== "undefined") {
      let sum = 0;
      for (const i of this.ingresoCajaForm?.value?.hpagos) {
        sum += i.valor
      }
      if (consto_asist_med !== sum) {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'El total pagado no coincide con el valor a pagar' });
        return
      }
    }
    return
    this.confirmationService.confirm({
      message: '¿Estas seguro de registrar nueva cita médica?',
      header: 'Confirmación',
      acceptLabel: 'Guardar',
      rejectLabel: 'Cerrar',

      accept: () => {
        this.citasMedicaService.insertNuevaCita({ ...this.ingresoCajaForm.value }).subscribe({
          next: response => {
            const byteArray = new Uint8Array(atob(response).split('').map(char => char.charCodeAt(0)));
            const blob = new Blob([byteArray], { type: 'application/pdf' })
            saveAs(blob, 'comprobante-pago.pdf');
          },
          complete: () => {
            setTimeout(() => {
              this.onHide()
            }, 2000)
          },
          error: (err) => {
            console.log('err', err)
            const { error } = err
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error insertando' });
            return
          }
        })
      }
    });




  }

  onSubmit(): void {
    console.log(this.ingresoCajaForm.valid)
    if (this.tipo === 'N') {
      this.insertNuevaCita()
    }

  }
  onPropagar(): void {
    this.showModalNuevoUsuario = false;
    this.propagar.emit(false);
    this.refres.emit(true);
  }

  onRefresGrid(): void {
    this.refres.emit(true);
  }

  onHide(): void {
    this.onPropagar();
  }

  getCliente(): void {
    const identificacion = this.ingresoCajaForm.get('identificacion')?.value
    this.citasMedicaService.getCliente({ identificacion }).subscribe((resp: any) => {
      if (typeof resp !== 'undefined' && typeof resp.registro !== 'undefined') {
        resp.registro.fecha_nacimiento = new Date(resp.registro.fecha_nacimiento)
        this.ingresoCajaForm.patchValue({ ...resp.registro })
      }

    })
  }
  createItem(): FormGroup {
    return this.fb.group({
      forma_pago: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
    });
  }
  addItem(): void {
    this.hpagos = this.ingresoCajaForm.get('hpagos') as FormArray;
    this.hpagos.push(this.createItem());
  }
  removeitem(i: any) {
    if (this.hpagos.length === 1) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debe especificar al menos una forma de pago' });
      return
    }
    this.hpagos.removeAt(i)
  }

}
