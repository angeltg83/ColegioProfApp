import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { AuthService } from '@auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true
  loading: boolean = false
  private subscripcion: Subscription = new Subscription;
  loginForm = this.fb.group({ username: ["", Validators.required], contrasena: ["", [Validators.required, Validators.minLength(6)]] })

  constructor(private authSrv: AuthService, private fb: FormBuilder, private router: Router, private messageService: MessageService) { }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
  onLogin(): void {
    this.loading = true
    if (this.loginForm.invalid) {
      return
    }
    const formValue = this.loginForm.value
    this.subscripcion.add(
      this.authSrv.login(formValue)
        .subscribe(res => {
          console.log(res)
          if (res) {
            // { err: true, msg: "Usuario o contraseña no validos" }
            if (res.err) {
              console.log('res', res)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.msg });
              return
            }
            this.loading = false
            this.router.navigate([''])
          }

        }, err => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
          this.loading = false
          return
        })
    )
  }

  getErrorMessage(field: string) {
    let message;
    if (this.loginForm.get(field)?.errors?.required) {
      message = 'Campo requerido'
    } else if (this.loginForm.get(field)?.hasError('minlength')) {
      message = 'Campo debe tener más de 6 carácteres'
    }
    return message
  }
  isValidField(field: string) {
    return (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && this.loginForm.invalid
  }

}
