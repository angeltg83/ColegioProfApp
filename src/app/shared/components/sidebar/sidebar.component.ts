import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { MenuItem, MessageService, PrimeNGConfig, } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [MessageService]
})
export class SidebarComponent implements OnInit {

  items: MenuItem[] = [];
  menu: any = [];
  currentItem!: MenuItem;
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig, private authSrv: AuthService) { }
  ngOnInit(): void {
    this.authSrv.menu$.subscribe((menu: MenuItem) => {
      this.construccionMenuModulosJson(menu)
      this.menu = menu
    })
  }

  /**
   * @author Angel Tigua
   * @since 2020.01.24
   * @param item elemento seleccionado
   */
  addPage = ({ item }: any) => {
    this.currentItem = item;
  }


  /**
   * @author Angel Tigua
   * @since 2020.01.24
   * @param arregloModulos array de opciones personalidadas para pasarle una funcion addPage()
   */
  async construccionMenuModulosJson(arregloModulos: any) {
    for (const variable of arregloModulos) {
      for (let i of variable.menu) {
        if (!i.items) {
          if (i.routerLink) {
            i['command'] = this.addPage;
          }
        } else {
          await this.construccionMenuModulosHijosJson(i.items);

        }
      }
    }
  }

  /**
   * @author Angel Tigua
   * @since 2020.01.24
   * @param arregloModulos array de opciones personalidadas para pasarle una funcion addPage()
   */
  async construccionMenuModulosHijosJson(arregloModulos: any) {
    for (const variable of arregloModulos) {
      if (!variable.items) {
        if (variable.routerLink) {
          variable['command'] = this.addPage;
        }
      } else {
        await this.construccionMenuModulosHijosJson(variable.items);
      }
    }
  }


}
