import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MessageService, ConfirmationService, SelectItem } from "primeng/api"

import { AuthService } from "@app/pages/auth/auth.service"
import { RegistroProfesionalService } from "@app/services/registro-profesional.service"
import { endOfMonth, addDays } from "date-fns"
import { saveAs } from "file-saver"

@Component({
  selector: "app-form-profesion",
  templateUrl: "./form-profesional.component.html",
  providers: [MessageService, ConfirmationService],
  styleUrls: ["./form-profesional.component.css"],
})
export class FormProfesionalComponent implements OnInit {
  @Input() showModalFormProfesional: boolean = false
  @Input() tituloForm: string = ""
  @Input() form: any
  @Input() tipo: string = "N"
  @Output() propagar = new EventEmitter<boolean>()
  @Output() refres = new EventEmitter<Boolean>()
  loading = false
  getTiposIdentificaciones$!: Promise<any>
  profesionalForm: FormGroup = new FormGroup({})
  lista_titulos$!: Promise<any>
  fecha_ingreso_inicio_mes = addDays(new Date(endOfMonth(new Date())), 1)
  costo_mensual_primera_cuota = 10
  usuario_id = this.authService.getUser().id
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private profesionalService: RegistroProfesionalService
  ) { }

  setFormReactive(form: any = {}) {
    this.profesionalForm = new FormGroup({
      tipoIdentificacion: new FormControl("", [Validators.required]),
      identificacion: new FormControl("", [Validators.required]),
      nombres: new FormControl("", [Validators.required]),
      apellidos: new FormControl("", [Validators.required]),
      telefono: new FormControl("", [Validators.maxLength(10)]),
      fecha_nacimiento: new FormControl(null),
      direccion: new FormControl("", [Validators.required]),
      tituloObtenido: new FormControl("", [Validators.required]),
      codigoSenecyt: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),

      //datos de cuota y pagos
      fecha_ingreso: new FormControl(this.fecha_ingreso_inicio_mes, [Validators.required]),
      valorEfectivo: new FormControl(0),
      valorTarjetaCredito: new FormControl(0),
      valorTransferencia: new FormControl(0),

      estado_registro: new FormControl(true),
      usuario_id: new FormControl(this.usuario_id),
    })
  }

  ngOnInit(): void {
    this.getTiposIdentificaciones$ = this.profesionalService.getIdentificaciones()
    this.lista_titulos$=this.profesionalService.getCarrerasProf()
    this.setFormReactive()

  }

  insertProfesional(): void {
    if (this.profesionalForm.invalid) {
      this.messageService.add({
        severity: "warn",
        summary: "Advertencia",
        detail: "Hay campos obligatorios requeridos",
      })
      return
    }
    console.log(this.profesionalForm.value)

    const costoCuotaIngresado =
      this.valorEfectivo?.value + this.valorTarjetaCredito?.value + this.valorTransferencia?.value
    if (costoCuotaIngresado !== this.costo_mensual_primera_cuota) {
      this.messageService.add({
        severity: "warn",
        summary: "Advertencia",
        detail: "Debe ingresar el valor de una forma de pago",
      })
      return
    }

    this.confirmationService.confirm({
      message: "¿Estas seguro de registrar el nuevo profesional?",
      header: "Confirmación",
      acceptLabel: "Guardar",
      rejectLabel: "Cerrar",
      accept: () => {
        this.profesionalService.insert({ ...this.profesionalForm.value }).subscribe({
          next: (response) => {
            this.messageService.add({ severity: "success", summary: "Exito", detail: "Registro guardado con exito" })

            const byteArray = new Uint8Array(
              atob(response)
                .split("")
                .map((char) => char.charCodeAt(0))
            )
            const blob = new Blob([byteArray], { type: "application/pdf" })
            saveAs(blob, "comprobante-pago.pdf")

            // const { msg, severity } = response
            // console.log(msg)
            // this.messageService.add({ severity, summary: 'Exito', detail: msg });
          },
          complete: () => {
            setTimeout(() => {
              this.onHide()
            }, 1200)
          },
          error: (err) => {
            console.log("err", err)
            const { error } = err
            this.messageService.add({ severity: "error", summary: "Error", detail: error.msg })
            return
          },
        })
      },
    })
  }

  updateProfesional(): void {
    if (this.profesionalForm.invalid) {
      this.messageService.add({
        severity: "warn",
        summary: "Advertencia",
        detail: "Hay campos obligatorios requeridos",
      })
    }
    this.profesionalService.update({ ...this.profesionalForm.value }).subscribe({
      next: ({ msg }) => {
        this.messageService.add({ severity: "success", summary: "Exito", detail: msg })
      },
      complete: () => {
        setTimeout(() => {
          this.onHide()
          this.refres.emit(true)
        }, 1500)
      },
      error: (err) => {
        const { error } = err
        this.messageService.add({ severity: "error", summary: "Error", detail: error.msg })
        return
      },
    })
  }
  onSubmit(): void {
    console.log(this.profesionalForm.valid)
    if (this.tipo === "N") {
      this.insertProfesional()
    } else {
      this.updateProfesional()
    }
  }
  onPropagar(): void {
    this.showModalFormProfesional = false
    this.propagar.emit(false)
  }

  onRefresGrid(): void {
    this.refres.emit(true)
  }

  onHide(): void {
    this.onPropagar()
  }

  cambioTipoIdentificacion(event: any) {
    //console.log(event)
    const { value } = event
    if (value === 1) {
      this.identificacion?.setValidators(Validators.maxLength(10))
    } else {
      this.identificacion?.setValidators(Validators.maxLength(13))
    }
  }

  get nombres() {
    return this.profesionalForm.get("nombres")
  }
  get apellidos() {
    return this.profesionalForm.get("apellidos")
  }
  get tipoIdentificacion() {
    return this.profesionalForm.get("tipoIdentificacion")
  }
  get identificacion() {
    return this.profesionalForm.get("identificacion")
  }

  get telefono() {
    return this.profesionalForm.get("telefono")
  }
  get fecha_nacimiento() {
    return this.profesionalForm.get("fecha_nacimiento")
  }
  get direccion() {
    return this.profesionalForm.get("direccion")
  }
  get tituloObtenido() {
    return this.profesionalForm.get("tituloObtenido")
  }

  get codigoSenecyt() {
    return this.profesionalForm.get("codigoSenecyt")
  }
  get email() {
    return this.profesionalForm.get("email")
  }

  get valorEfectivo() {
    return this.profesionalForm.get("valorEfectivo")
  }
  get valorTarjetaCredito() {
    return this.profesionalForm.get("valorTarjetaCredito")
  }
  get valorTransferencia() {
    return this.profesionalForm.get("valorTransferencia")
  }
}
