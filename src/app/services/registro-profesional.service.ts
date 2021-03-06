import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { Observable } from "rxjs"
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RegistroProfesionalService {

    constructor(private http: HttpClient) { }

    getListRegistroProfesional(params: any): Observable<any> {
        const url = `${environment.API_URL}/administracion/registro/profesional/list`;
        return this.http.post(url, params)
    }

    insert(params: any): Observable<any> {
        const url = `${environment.API_URL}/administracion/registro/profesional/insert`;
        return this.http.post(url, params, { responseType: 'text' })
    }

    getEstadoCuenta(params: any): Observable<any> {
        const url = `${environment.API_URL}/administracion/registro/profesional/estado-cuenta/select`;
        return this.http.post(url, params)
    }

    async getIdentificaciones(params: any = {}) {
        const url = `${environment.API_URL}/catalogo/tipoIdentificacion/select`
        return await this.http.post(url, params).toPromise()
    }
    async getCarrerasProf(params: any = {}) {
        const url = `${environment.API_URL}/catalogo/carreras/select`
        return await this.http.post(url, params).toPromise()
    }






    update(params: any): Observable<any> {
        const url = `${environment.API_URL}/perfil/update`;
        return this.http.post(url, params)
    }



    /**
     * 
     * @param params [id]
     * @returns Observable
     */
    asignPerfilUsuario(params: any): any {
        const url = `${environment.API_URL}/asignacion/perfil/usuario`;
        return this.http.post(url, params)
    }

    eliminarPerfilUsuario(params: any): any {
        const url = `${environment.API_URL}/eliminacion/perfil/usuario`;
        return this.http.post(url, params)
    }

}
