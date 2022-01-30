import { NgModule } from "@angular/core";

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';

const myModules: Array<any> = [ImageModule, FieldsetModule, ConfirmDialogModule, CalendarModule, InputNumberModule, DropdownModule, DynamicDialogModule, DividerModule, AccordionModule, MenuModule, ButtonModule, ToolbarModule, SidebarModule, ToastModule, PanelMenuModule,
    TableModule, PanelModule, TagModule, TooltipModule, DialogModule, CheckboxModule, InputTextModule, ListboxModule, PasswordModule];
@NgModule({
    imports: [...myModules],
    exports: [...myModules],

})

export class PrimeNgModule { }