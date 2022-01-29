import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@app/pages/auth/auth.service';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSrv: AuthService) { }
  canActivate(): Observable<boolean> {
    return this.authSrv.isLogged.pipe(take(1), map((isLogged: boolean) => !isLogged))
  }

}
