import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { MessageService, ConfirmationService } from "primeng/api"
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { RolesService } from "@app/services/roles.service"

@Component({
  selector: "app-form-reset-contrasena",
  templateUrl: "./resetContrasena.component.html",
  providers: [MessageService, ConfirmationService],
  styleUrls: ["./resetContrasena.component.css"],
})
export class ResetContrasenaComponent implements OnInit {
  @Input() showModalResetPass: boolean = false
  //@Input() tituloForm: string = '';
  //@Input() form: any;
  //@Input() tipo: string = "N";
  //@Output() propagar = new EventEmitter<boolean>();
  //@Output() refres = new EventEmitter<Boolean>();

  loading = false
  perfilForm: FormGroup = new FormGroup({})

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private rolService: RolesService
  ) { }

  setFormReactive(form: any = {}) {
    this.perfilForm = new FormGroup({
      id_perfil: new FormControl(form?.id || null),
      correo: new FormControl(form?.nombre || "", [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    //  console.log('form', this.form)
    this.setFormReactive()
    // if (typeof this.form !== 'undefined') {
    //   this.setFormReactive(this.form)
    // }
  }

  insertPerfil(): void {
    if (this.perfilForm.invalid) {
      this.messageService.add({
        severity: "warn",
        summary: "Advertencia",
        detail: "Hay campos obligatorios requeridos",
      })
      return
    }

    this.rolService.insert({ ...this.perfilForm.value }).subscribe({
      next: ({ msg }) => {
        this.messageService.add({ severity: "success", summary: "Exito", detail: msg })
      },
      complete: () => {
        setTimeout(() => {
          this.onHide()
          this.onRefresGrid()
        }, 1200)
      },
      error: (err) => {
        const { error } = err
        this.messageService.add({ severity: "error", summary: "Error", detail: error.msg })
        return
      },
    })
  }

  updatePerfil(): void {
    if (this.perfilForm.invalid) {
      this.messageService.add({
        severity: "warn",
        summary: "Advertencia",
        detail: "Hay campos obligatorios requeridos",
      })
    }
    //const {id_perfil} = this.perfilForm.value
    this.rolService.update({ ...this.perfilForm.value }).subscribe({
      next: (response: any) => {
        const { msg } = response
        this.messageService.add({ severity: "success", summary: "Exito", detail: msg })
      },
      complete: () => {
        setTimeout(() => {
          this.onHide()
          this.onRefresGrid()
        }, 1200)
      },
    })
  }
  onSubmit(): void {
    console.log(this.perfilForm.valid)
    // if (this.tipo === 'N') {
    //   this.insertPerfil()
    // } else {
    //   this.updatePerfil()

    // }
  }
  onPropagar(): void {
    //this.propagar.emit(false);
    //this.showModalResetPass = false;
  }

  onRefresGrid(): void {
    //this.refres.emit(true);
  }

  onHide(): void {
    this.onPropagar()
  }
  get correo() {
    return this.perfilForm.get("correo")
  }
}
