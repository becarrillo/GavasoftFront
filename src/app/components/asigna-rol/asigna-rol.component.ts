import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/Empleado';
import { UsuarioRol } from '../../models/UsuarioRol';

@Component({
  selector: 'app-asigna-rol',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './asigna-rol.component.html',
  styleUrl: './asigna-rol.component.css'
})
export class AsignaRolComponent {
  rol! : string | null;
  rolOptionHasChanged! : boolean;
  usuarioRol! : UsuarioRol;
  empleado! : Empleado;
  theme?: string;

  constructor(private empleadoService : EmpleadoService) {}

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;

    this.rolOptionHasChanged = false;

    const empleadoNumDocumentoPath = location.pathname.split('/').at(-2);
    if (empleadoNumDocumentoPath) {
      this.empleadoService.getEmpleado(empleadoNumDocumentoPath)
      .subscribe(data => {
        data['fecha_entrada'] = new Date(data.fecha_entrada).toLocaleDateString();
        this.empleado = data;
      });
    }
  }

  setEmpleadoRol(event : Event) : void {
    this.rol = (event.target as HTMLInputElement).value;
    this.rolOptionHasChanged = true;
  }

  handChanges() : void {
    this.usuarioRol = {
      usuarioId: this.empleado['usuario_id'],
      rol: this.rol
    }

    this.empleadoService.assignRol(
      this.empleado['num_documento'],
      this.usuarioRol
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
