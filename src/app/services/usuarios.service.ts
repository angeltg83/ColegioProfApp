import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsuarios(params: any) {
    const url = `${environment.API_URL}/list-user`;
    return this.http.post(url, params)
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
