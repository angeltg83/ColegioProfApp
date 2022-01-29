import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  async getOpcions(params: any) {
    const url = `${environment.API_URL}/getOpcions`;
    const resp = await this.http.post<boolean>(url, params).toPromise();
    return resp
  }


}
