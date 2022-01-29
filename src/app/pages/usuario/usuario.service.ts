import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment'
import { LazyLoadEvent } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }
/*
  loadSolicitudes(event: LazyLoadEvent) {
    console.log(event)
    //const { nombres, apellidos } = event?.filters!
    const condiciones = JSON.stringify({});
/*
    return this.http.post(`${environment.API_URL}/listado-usuario`, condiciones).pipe(
      map((res: any) => {
        console.log(res.data)
        return res.data

      }),
      catchError((err) => throwError(err))
    )
*/

    /*
        this.apiService.callResult({ metodo: 'usuarios.consultar', parametros: { condiciones, maximo: event.rows, pagina: ((event.first / event.rows) + 1) } })
          .subscribe({
            next: ({ registros, total }) => {
              this.datosTabla$ = registros;
              this.total = total;
            },
          });
    
          
  }*/

}
