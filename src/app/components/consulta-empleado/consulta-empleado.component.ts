import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/Empleado';

@Component({
  selector: 'app-consulta-empleado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './consulta-empleado.component.html',
  styleUrl: './consulta-empleado.component.css'
})
export class ConsultaEmpleadoComponent implements OnInit {
  theme?: string;
  toRealizarConsulta: boolean = false;
  consultaOption!: string;
  empleado!: Empleado;
  empleadosArray: Empleado[] = [];
  empleadoNumDocumento!: string;
  consultaValue! : string;
  img : string = '././././assets/ejemplo-perfil.jpeg';
  radioCheckedReference! : string;

  constructor(private readonly empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }

  enableEmpleadoActionBtns(radioCheckedReference : string): void {
    this.radioCheckedReference = radioCheckedReference;
  }

  setConsultaByOption(option: string, ev: Event) {
    this.consultaOption = option;
    this.consultaValue = (ev.target as HTMLInputElement).value;
  }

  submitSearch(event: Event) {
    event.preventDefault();
    switch (this.consultaOption) {
      case "num_documento":
        this.empleadoService
          .getEmpleado(this.consultaValue)
          .subscribe((data: Empleado) => {
            this.empleado = data
          });
        break;
      case "nombre":
        this.empleadoService
          .listEmpleadosByNombre(this.consultaValue)
          .subscribe((data: Empleado[]) => {
            this.empleadosArray = data
          })
    }
    this.toRealizarConsulta = true;
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
