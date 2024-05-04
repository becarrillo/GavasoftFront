import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';

@Component({
  selector: 'app-consulta-servicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './consulta-servicio.component.html',
  styleUrl: './consulta-servicio.component.css'
})
export class ConsultaServicioComponent implements OnInit {
  theme?: string;
  searchBtnIsBlur: boolean = true;
  isShowMessage = false;
  servicioName = '';
  servicioIsFound = false;

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }

  // Manejador del input de consulta servicio que emite el evento cuando el usuario va escribiendo en el 
  setServicioName(ev: Event) {
    this.servicioName = (ev.target as HTMLInputElement).value;
  }

  // Manejador del evento 'submit' del formulario de consulta servicio
  submitServicio(ev: SubmitEvent) {
    ev.preventDefault();
    var path : string;
    path = '';
    path += window.location.href.concat('/'+this.servicioName.replaceAll(' ', '-'));
    window.location.href = path;
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
