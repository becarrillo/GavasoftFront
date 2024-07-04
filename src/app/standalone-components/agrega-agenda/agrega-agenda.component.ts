import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { AgendamientoService } from '../../services/agendamiento.service';
import { Agendamiento } from '../../models/Agendamiento';
import { Servicio } from '../../models/Servicio';
import { ServicioService } from '../../services/servicio.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-agrega-agenda',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './agrega-agenda.component.html',
  styleUrl: './agrega-agenda.component.css'
})
export class AgregaAgendaComponent implements OnInit {
  agendamientoDate!: number[];
  agendamientoService : AgendamientoService = inject(AgendamientoService);
  agendamientoTime! : number[];
  cookies : CookieService = inject(CookieService);
  foundAgendamiento : Agendamiento | undefined;
  rol : string = this.cookies.get("rol");
  servicioId : string | undefined = undefined;
  serviciosList! : Servicio[];
  servicioService : ServicioService = inject(ServicioService);
  theme?: string;

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;

    this.servicioService.listAll()
      .subscribe((data : Servicio[]) => {
        this.serviciosList = data;
      });
  }

  getAgendamientoByFechaHora(fechaHora : string) : Agendamiento | undefined {
    this.agendamientoService
      .getOneByFechaHora(
        fechaHora
      ).subscribe((data : Agendamiento) => {
          this.foundAgendamiento = data;
        }
      );
    if (this.foundAgendamiento) {
      return this.foundAgendamiento;
    }
    return undefined;
  }

  handFecha(ev: Event) {
    const inputAsArray = (ev.target as HTMLInputElement).value.split("-");

    this.agendamientoDate = [
      parseInt(inputAsArray.at(0) as string) as number,
      (parseInt(inputAsArray.at(1) as string) as number)-1,  // Restar 1 porque el tipo Date mapea al mes como un índice de array
      parseInt(inputAsArray.at(2) as string) as number,
    ];
  }

  handHora(ev: Event) {
    // convierte la hora del input a un arreglo de números
    const inputAsArray = ((ev.target as HTMLInputElement).value).split(":");

    this.agendamientoTime = [
      parseInt(inputAsArray.at(0) as string)-5,
      parseInt(inputAsArray.at(1) as string),
      parseInt(inputAsArray.at(2) as string)
    ];

    if (this.agendamientoDate) {
      this.foundAgendamiento = this.getAgendamientoByFechaHora(
        new Date(
          this.agendamientoDate.at(0) as number,
          this.agendamientoDate.at(1) as number,
          this.agendamientoDate.at(2) as number,
          this.agendamientoTime.at(0) as number,
          this.agendamientoTime.at(1) as number,
          this.agendamientoTime.at(2) as number
        ).toJSON()
      );
    }
    if (this.foundAgendamiento) {  // Ya está agendado un Servicio a la misma fecha y hora
      window.alert(
        `Por favor elija otro horario ya que para el ${this.foundAgendamiento.fechaHora}, 
        ya este ha sido ${this.foundAgendamiento.estado} `
      );
      (ev.target as HTMLInputElement).remove();
    }
  }

  handChangeServicio(ev : Event) : void {
    this.servicioId = (ev.target as HTMLInputElement).value as string;
  }

  submitAgendamiento(ev : Event) {
    ev.preventDefault();

    const agendamiento = {
      fechaHora: new Date(
        this.agendamientoDate.at(0) as number,
        this.agendamientoDate.at(1) as number,
        this.agendamientoDate.at(2) as number,
        (this.agendamientoTime.at(0) as number) as number, 
        this.agendamientoTime.at(1) as number,
        this.agendamientoTime.at(2) as number
      ).toJSON(),
      servicioId: this.servicioId as string
    }
    
    this.agendamientoService.save(
      agendamiento
    ).subscribe((data : Agendamiento) => {
      window.alert(
        `
          Usted tiene agendado exitosamente el servicio para el ${data.fechaHora} . 
          ID de cita: ${data.agendamientoId}
        `
      );
    });
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
