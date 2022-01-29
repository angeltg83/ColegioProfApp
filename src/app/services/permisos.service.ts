import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"
import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http: HttpClient) { }

  getPermisoListado(params: any) {
    const url = `${environment.API_URL}/permiso/listado`;
    return this.http.post(url, params)
  }

  async getModuloSelect() {
    const url = `${environment.API_URL}/modulo/select`;
    return await this.http.post(url,{}).toPromise()
  }

  insertPermiso(params: any): Observable<any>  {
    const url = `${environment.API_URL}/permiso/insert`;
    return this.http.post(url, params)
  }


  updatePermiso(params: any): Observable<any> {
    const url = `${environment.API_URL}/permiso/update`;
    return this.http.post(url, params)
  }

}
