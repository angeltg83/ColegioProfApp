import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { User, UserResponse } from '@app/shared/models/user.interfaces';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false)

  menu$ = new EventEmitter<MenuItem>();

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken()
  }
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable()
  }
  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}/auth`, authData).pipe(
      map((res: UserResponse) => {
        console.log('res 1', res)
        if (typeof res.token !== 'undefined') {
          this.saveToken(res.token)
          if (typeof res.username !== 'undefined' && typeof res.id !== 'undefined') {
            this.setUser(res.username, res.id)
          }
          this.loggedIn.next(true)
        }

        return res

      }),
      catchError((err) => this.handlerErr(err)  )
    )
  }
  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.loggedIn.next(false)
    this.router.navigate(['/login'])
  }

  private checkToken(): void {
    const userToken: string = localStorage.getItem('token') || ''
    const isExpired = helper.isTokenExpired(userToken)
    console.log(isExpired)
    isExpired ? this.logout() : this.loggedIn.next(true)

  }
  private saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  private handlerErr(err: any): Observable<never> {
    let errMessage = 'An error ocurred!!'
    if (err) {
      errMessage = `${err.error.msg}`
    }
   // window.alert(errMessage)
    return throwError(errMessage)
  }

  getOptions(id: any) {
    console.log(id)

    return this.http.post(`${environment.API_URL}/get-options`, id).pipe(
      map((res: any) => {
        // if (typeof res.token !== 'undefined') {
        //   this.saveToken(res.token)
        //   this.loggedIn.next(true)
        // }
        //console.log(res.data)
        return res.data

      }),
      catchError((err) => this.handlerErr(err))
    )

  }

  private setUser(username: string, id: number): void {
    localStorage.setItem('user', JSON.stringify({ username, id }))
  }

  public getUser(): UserResponse {
    const user = JSON.parse(localStorage.getItem('user')!)
    return user
  }
}
