import { CommonModule, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { Servicio } from '../../models/Servicio';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-modifica-servicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './modifica-servicio.component.html',
  styleUrl: './modifica-servicio.component.css'
})
export class ModificaServicioComponent implements OnInit {
  servicio! : Servicio;
  servicioName = '';
  theme?: string;
  title : string = "Depilación bikini en láser";
  description : string = "Procedimiento de depilación de entrepierna en láser";
  duration : Time = {
    hours: 5,
    minutes: 4
  }
  price : number = 21000;
  imgUrl : string = "https://www.google.com/imgres?q=imagenes%20de%20depilacion%20" +
  "en%20laser%20en%20bikini&imgurl=https%3A%2F%2Fwww.bazzarbog.com%2F115524-" +
  "large_default%2Fdepilacion-laser-diodo-bikini-total.jpg&imgrefurl=https%3A%2F" +
  "%2Fwww.bazzarbog.com%2Fsalud-y-belleza%2F51645-depilacion-laser-diodo-bikini-" +
  "total.html&docid=L74EY106FD1j2M&tbnid=RzsLRS3486KTJM&vet=12ahUKEwis4ueEyd6FAx" +
  "UTVjABHQxGCBgQM3oECFsQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwis4ueEyd6FAxUTVjABH" +
  "QxGCBgQM3oECFsQAA";
  // urlParam : string = 
  constructor(private readonly servicioService : ServicioService) {}

  ngOnInit(): void {
    // this.servicio = this.servicioService.getServicio(this.servicioName);

    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }
  /**
   * tanto el método de inicio 'ngOnInit()' como 'toggleTheme()' manejan en el sistema
   * el tema de la UI de claro a oscuro y viceversa cuando el admin da click en el bo-
   * tón de cambio de tema en el header
  **/
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
