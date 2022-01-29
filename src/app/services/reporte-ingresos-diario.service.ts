import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class RptIngresosDiarioService {

  constructor(private http: HttpClient) { }

  async getSelectUsuario() {
    const url = `${environment.API_URL}/usuario/select`;
    return await this.http.post(url, {}).toPromise()
  }

  getReporteIngresoDiario(params: any): Observable<any> {
    const url = `${environment.API_URL}/recaudacion/getReporteIngresosXfecha`;
    return this.http.post(url, params, { responseType: 'text' })
  }


  crearCierrreDiario(params: any): Observable<any> {
    const url = `${environment.API_URL}/recaudacion/crearCierreIngresosXfecha`;
    return this.http.post(url, params, { responseType: 'text' })
  }

  getListadoArqueo(params: any) {
    const url = `${environment.API_URL}/recaudacion/arqueo/listado`;
    return this.http.post(url, params)
  }

  getReporteXIDIngresoDiario(params: any): Observable<any> {
    const url = `${environment.API_URL}/recaudacion/getReporteIngresosXID`;
    return this.http.post(url, params, { responseType: 'text' })
  }


}
