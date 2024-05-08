import { Component } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { UsuarioRol } from '../../models/UsuarioRol';
import { Empleado } from '../../models/Empleado';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { fromZonedTime } from 'date-fns-tz';

@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
})
export class ListaEmpleadosComponent {
  theme?: string;
  empleadosArray : Empleado[] = [];
  rol! : string | null;
  rolOptionHasChanged! : boolean;

  constructor(private empleadoService : EmpleadoService) {}

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;

    this.rolOptionHasChanged = false;
    const transformDateOutput = (dateOutput : string | null) : string | null | void => {
      if (dateOutput) {
        var strDate = formatDate(new Date(dateOutput as string).toJSON()) as string;
        return strDate;
      }
    }

    this.empleadoService.listAll()
      .subscribe((data : Empleado[]) => {
        data.forEach(d => {
          d.fecha_entrada=transformDateOutput(d['fecha_entrada'] as string) as string;
          if (d.fecha_retiro!== null) {
            d.fecha_retiro=transformDateOutput(d['fecha_retiro'] as string) as string;
          }
        });
        this.empleadosArray = data
      });
    const formatDate = (dateInput : string)  => {
      if (isNaN(Date.parse(dateInput)+1)) {
        return null;
      }
      const utcDate = fromZonedTime(dateInput, 'America/Bogota');
      const dateString = utcDate.toLocaleDateString('es-CO');
      
      let splitReversedDate = dateString.split("/").reverse();
      splitReversedDate.forEach((str, index) => {
        if (str.length===1) {
          splitReversedDate[index] = "0"+str;
        }
      });
      let response! : string;
      response = splitReversedDate.join("-");
      return response;
    }
  }

  setEmpleadoRol(ev : Event, usuarioId : number | null, numDocumento : string) : void {
    const usuarioRol = {
      usuarioId: usuarioId,
      rol: (ev.target as HTMLInputElement).value as string | null
    } as UsuarioRol;
    
    this.empleadoService.assignRol(
      numDocumento,
      usuarioRol
    ).subscribe(data => {
      window.alert(data.toString().concat(" rol del empleado actualizado exitosamente"));
      window.location.reload();
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
