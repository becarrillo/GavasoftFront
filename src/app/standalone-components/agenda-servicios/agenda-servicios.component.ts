import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendamientoService } from '../../services/agendamiento.service';
import { Agendamiento } from '../../models/Agendamiento';
import { Servicio } from '../../models/Servicio';
import { ServicioService } from '../../services/servicio.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-/agenda-servicios',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './agenda-servicios.component.html',
  styleUrl: './agenda-servicios.component.css'
})
export class AgendaServiciosComponent implements OnInit {
  agendamientoFormGroup : FormGroup<AgendamientoControls> = new FormGroup({
    fechaHoraControl: new FormControl<string>('', Validators.required),
    servicioNombreControl: new FormControl<string>('', Validators.required),
    usuarioClienteIdControl: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1)
    ])
  } as AgendamientoControls);
  agendamientoDate!: number[];
  agendamientoService : AgendamientoService = inject(AgendamientoService)
  agendamientoTime! : number[];
  cookies : CookieService = inject(CookieService);
  rol : string = this.cookies.get("rol");
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

  onServicioChange(ev : Event) {
    window.alert((ev.target as HTMLInputElement).value);
  }

  handFecha(ev: Event) {
    const inputAsArray = (ev.target as HTMLInputElement).value.split("-");

    this.agendamientoDate = [
      parseInt(inputAsArray.at(0) as string) as number,
      parseInt(inputAsArray.at(1) as string) as number,
      parseInt(inputAsArray.at(2) as string) as number,
    ];
    window.alert(this.agendamientoDate);
  }

  handHora(ev: Event) {
    /* convierte la hora del input a un arreglo de string, convierto a enteros
    las secciones del mismo y los agrego al objeto JSON de salida */
    const timeArr = ((ev.target as HTMLInputElement).value).split(":");
    
    this.agendamientoTime = [
      parseInt(timeArr.at(0) as string),
      parseInt(timeArr.at(1) as string),
      parseInt(timeArr.at(2) as string)
    ];
    window.alert(this.agendamientoTime);
  }

  submitAgendamiento(ev : Event) : void {
    ev.preventDefault();
    let agendamiento : Agendamiento = {
      fechaHora: new Date(
        this.agendamientoDate.at(0) as number,
        (this.agendamientoDate.at(1) as number)-1,
        this.agendamientoDate.at(2) as number,
        (this.agendamientoTime.at(0) as number),
        this.agendamientoTime.at(1) as number,
        this.agendamientoTime.at(2) as number
      ).toJSON(),
      servicioId: this.agendamientoFormGroup.value.servicioNombreControl as string
    }
    
    this.agendamientoService.save(
      agendamiento
    ).subscribe((data : Agendamiento) => {
      agendamiento = data
    });
    window.alert(`Se guardó el agendamiento: ${agendamiento}`)
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

type AgendamientoControls = {
  fechaHoraControl: FormControl<string>,
  servicioNombreControl: FormControl<string>,
  usuarioClienteIdControl: FormControl<number>
}

