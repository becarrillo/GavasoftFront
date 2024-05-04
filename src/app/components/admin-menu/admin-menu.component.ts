import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import adminConfig from '../../../configs/roles.administrador.config';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent implements OnInit {
  items: any = adminConfig.adminMenu;
  rolName: string = adminConfig.rolName;
  protected breadcrumb: string[] = [];
  navLookupReceivedValue: string = '';
  theme?: string;

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;

    this.breadcrumb.push("Menú Administrador");
  }

  /**
   * Actualiza los ítems del archivo de configuración a los del key "adminMenu"
   * (Quice que se mostrara en el botón como 'Menú Administrador') los que tie-
   * nen el 'title' del parámetro y a los del mismo 'title' del parámetro si es
   * otro elemento del arreglo breadcrumb.
   * Luego recorta arreglo breadcrumb de navegación menú a la acción solicitada
   * por el admin con el botón que haya seleccionado
   **/
  cutBreadcrumbByTitleIndex(index: number) {
    this.breadcrumb.at(index) === "Menú Administrador" ?
      this.items = adminConfig.adminMenu
      : this.setItems(this.breadcrumb.at(index) as string);
    this.breadcrumb.splice(index + 1);
  }



  pushAdminMenuOption(title: string) {
    const foundObjFromMenu = adminConfig.adminMenu.find(
      obj => obj.title === title
    );

    let foundObjFromSubmenu : TypeOfAdminConfigSubmenu | undefined;

    type TypeOfAdminConfigSubmenu = {
      "icon": {"height": number, "url": string, "width": number},
      "title": string,
      "redirection": string | undefined
    }

    if (foundObjFromMenu) {
      this.setItems(foundObjFromMenu?.title as string);
      this.breadcrumb.push(foundObjFromMenu?.title as string);
      
    } else {
      adminConfig.adminMenu.forEach(el => {
        if (
          el.title !== title &&
          el.submenu?.find(el1 => el1.title === title)
        ) {
          foundObjFromSubmenu = el.submenu?.find(el1 => el1.title === title) as TypeOfAdminConfigSubmenu
        }
      });

      if (foundObjFromSubmenu) {
        foundObjFromSubmenu?.redirection ? window.location.href = foundObjFromSubmenu?.redirection as string
        : this.setItems(foundObjFromSubmenu?.title as string);
        this.breadcrumb.push(title as string)
      }
    }
  }

  receiveNavLookupValue(value: string): void {
    this.navLookupReceivedValue = value;
  }

  /**
    * Del archivo de configuración del Menú Administrador
    * (roles.administrador.config.ts) se saca el arreglo submenú del ítem con
    * valor del parámetro title por medio del atributo con el mismo nombre, pa-
    * ra mapear los elementos de los íconos y botones por página para la nave-
    * gación del usuario autorizado de rol administrador sin necesidad de usar
    * el enrutamiento cuando usa la misma plantilla html garantizando responsa-
    * bilidades únicas
  */
  setItems(title: string) {
    this.items = adminConfig.adminMenu.find(i => i.title === title)?.submenu;
  }

  toggleTheme(boolTheme: boolean): void {
    boolTheme === false ? (
      window.localStorage.setItem("theme", "dark")
    ) : (
      window.localStorage.setItem("theme", "light")
    );

    const storagedTheme = window.localStorage.getItem("theme");
    console.log(storagedTheme);
    this.theme = (storagedTheme as string);
  }
}
