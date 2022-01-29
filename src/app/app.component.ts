import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authSrv: AuthService) { }
  showMenu = false
  ngOnInit(): void {
    this.authSrv.isLogged.subscribe(res => this.showMenu = res)
  }
  title = 'consultorio-app';
  opened = false
}
