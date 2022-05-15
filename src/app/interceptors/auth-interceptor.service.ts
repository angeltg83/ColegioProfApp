import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private router: Router, private authSrv: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token')
    let request = req
    if (token !== null) {
      request = req.clone({ setHeaders: { authorization: token } })
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.authSrv.logout();
        }
        return throwError(err)
      })
    )
  }
}
