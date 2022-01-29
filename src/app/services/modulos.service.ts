import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor(private http: HttpClient) { }
  getModulos(params: any): Observable<any> {
    const url = `${environment.API_URL}/modulo/listado`;
    return this.http.post(url, params)
  }

  getModuloForm(params: any): Observable<any> {
    const url = `${environment.API_URL}/modulo/getModuloId`;
    return this.http.post(url, params)
  }

  insertModulo(params: any): Observable<any> {

    console.log(params)
    const url = `${environment.API_URL}/modulo/insert`;
    return this.http.post(url, params)
  }

  updateModulo(params: any): Observable<any> {
    const url = `${environment.API_URL}/modulo/update`;
    return this.http.post(url, params)
  }
  
}
