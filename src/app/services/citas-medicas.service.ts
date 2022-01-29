import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class CitasMedicasService {

  constructor(private http: HttpClient) { }

  async getSelectDoctor() {
    const url = `${environment.API_URL}/doctor/select`;
    return await this.http.post(url, {}).toPromise()
  }

  async getHorarioDoctor(params: any) {
    const url = `${environment.API_URL}/doctor/citas/horarios`;
    return await this.http.post(url, params).toPromise()
  }

  async getHorariosDisponibles(params: any) {
    const url = `${environment.API_URL}/horarios_diponibles_dia/select`
    return await this.http.post(url, params).toPromise()
  }

  insertNuevaCita(params: any): Observable<any> {
    const url = `${environment.API_URL}/citas-medicas/insert`;
    return this.http.post(url, params, { responseType: 'text'})
  }

  async getTipoConsulta() {
    const url = `${environment.API_URL}/citas-medica/tipo/select`;
    return await this.http.post(url, {}).toPromise()
  }

  async getTipoFormaPago() {
    const url = `${environment.API_URL}/citas-medica/forma_pago/select`;
    return await this.http.post(url, {}).toPromise()
  }

  getCliente(params: any) {
    const url = `${environment.API_URL}/cliente/indentificacion/select`;
    return this.http.post(url, params)
  }
  /*
    updateUser(params: any): Observable<any> {
      const url = `${environment.API_URL}/usuario/update`;
      return this.http.post(url, params)
    }
  */

}
