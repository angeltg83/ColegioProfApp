import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  constructor(private http: HttpClient) { }
  async getAplicacionSelect() {
    const url = `${environment.API_URL}/aplicacion/select`;
    return await this.http.post(url, {}).toPromise()
  }

  async getModuloSelect() {
    const url = `${environment.API_URL}/modulo/select`;
    return await this.http.post(url,{}).toPromise()
  }




}
