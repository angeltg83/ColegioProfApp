import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '@app/pages/auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = true;
  isLogged = false;
  header_title = "Colegio de Profesionales"
  private subscripcion: Subscription = new Subscription;
  @Output() toggleSidenav = new EventEmitter<void>();
  events = [];
  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.isLogged.subscribe(res => {
      this.isLogged = res
      //console.log('antes de menu...', this.isLogged)
      if (this.isLogged) {
        const user: UserResponse = this.authSrv.getUser()
        console.log({ user })
        this.authSrv.getOptions({ id: user.id }).subscribe(menu => {
          console.log(menu)
          this.authSrv.menu$.emit(menu);
        })
      }

    })



  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
  onLogout(): void {
    this.authSrv.logout()
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
