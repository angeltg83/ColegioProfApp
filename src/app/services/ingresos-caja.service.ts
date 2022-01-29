import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"

import { ingresoCajaResponse } from '@app/models/contable.modelo'
@Injectable({
  providedIn: 'root'
})

export class IngresosCajaService {
  constructor(private http: HttpClient) { }

  getListIngresosCaja(params: any): Observable<ingresoCajaResponse> {
    const url = `${environment.API_URL}/ingresos-caja/list`;
    return this.http.post<ingresoCajaResponse>(url, params)
  }

  insertUser(params: any): Observable<any> {
    const url = `${environment.API_URL}/usuario/insert`;
    return this.http.post(url, params)
  }

  updateUser(params: any): Observable<any> {
    const url = `${environment.API_URL}/usuario/update`;
    return this.http.post(url, params)
  }


}
