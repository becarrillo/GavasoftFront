import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Empleado } from '../models/Empleado';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { UsuarioRol } from '../models/UsuarioRol';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private httpClient : HttpClient = inject(HttpClient);

  assignRol(numDocumento : string, usuarioRol: UsuarioRol) : Observable<number> {
    const headers = new HttpHeaders();
    headers.append("Vary", "Origin");
    headers.append("Content-Type", "application/json");
    
    return this.httpClient.post<number>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/consultar/"+numDocumento.concat("/asignar-rol"),
      usuarioRol,
      {
        headers
      }
    );
  }

  getEmpleado(numDocumento : string) : Observable<Empleado> {
    const headers = new HttpHeaders();
    headers.append("Vary", "Origin");

    return this.httpClient.get<Empleado>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/consultar/"+numDocumento,
      {
      headers
      }
    );
  }

  getUsuarioId(numDocumento : string) : Observable<number> {
    const headers = new HttpHeaders();
    headers.append("Vary", "Origin");

    return this.httpClient.get<number>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/consultar/"+
      numDocumento.concat("/obtener-id-de-usuario"),
      {
        headers
      }
    );
  }

  listAll() : Observable<Empleado[]> {
    const headers = new HttpHeaders();
    headers.append("Vary", "Origin");

    return this.httpClient.get<Empleado[]>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/listar",
      {
        headers
      }
    );
  }

  listEmpleadosByNombre(nombre : string) : Observable<Empleado[]> {
    const headers = new HttpHeaders();
    headers.append("Vary", "Origin");

    return this.httpClient.get<Empleado[]>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/consultar/por-nombre/"+
      nombre,
      {
      headers
      }
    );
  }

  listEmpleadosWithRolAsNull() : Observable<Empleado[]> {
    const headers = new HttpHeaders();
    headers.append("Vary", "Origin");

    return this.httpClient.get<Empleado[]>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/listar/sin-rol",
      {
        headers
      }
    );
  }

  postEmpleado(empleado : Empleado) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Vary", "Origin");

    return this.httpClient.post<Empleado>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/crear-cuenta/nuevo",
      empleado,
      {
        headers
      }
    );
  }

  updateEmpleado(numDocumento : string, empleado : Empleado) : Observable<number> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Vary", "Origin");

    return this.httpClient.put<number>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/consultar/"+numDocumento+
      "/modificar",
      empleado,
      {
        headers
      }
    );
  }

  deleteEmpleado(numDocumento : string) : Observable<number> {
    const headers = new HttpHeaders();
    headers.append("Vary", "Origin");

    return this.httpClient.delete<number>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-empleados/consultar/"+numDocumento+
      "/eliminar",
      {
        headers
      }
    );
  }
}
