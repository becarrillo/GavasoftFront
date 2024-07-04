import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../models/Servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private readonly httpClient : HttpClient) {
  }

  getServicio(servicioNombre : string) : Servicio {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    let data! : Servicio;

    this.httpClient.get<Servicio>(
      "https://usuario-app-production.up.railway.app/some-path/"+servicioNombre,
      {
        headers
      }
    ).subscribe(s => data = s);
    
    return data;
  }

  listAll() : Observable<Servicio[]> {

    return this.httpClient.get<Servicio[]>(
      "http://localhost:8081/v1/usuarios/empleados/listar-servicios"
    );
  }

  postServicio(servicio : Servicio) : Servicio {
    let data! : Servicio;

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    this.httpClient.post<Servicio>(
      "http://localhost:8081/v1/usuarios/empleados/menu-administrador/admin-servicios/agregar/nuevo",
      servicio,
      {
        headers
      }
    ).subscribe(s => {data = s});
    return data;
  }

  updateServicio(servicioNombre : string, servicio : Servicio) : number {
    let rows! : number

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    this.httpClient.put<number>(
      "URI/some-path/"+servicioNombre.concat("/eliminar"),
      {
        headers
      }
    ).subscribe(r => {rows = r});
    return rows;
  }

  deleteServicio(servicioNombre : string) : number {
    let rows! : number

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    this.httpClient.delete<number>(
      "URI/some-path/"+servicioNombre.concat("/eliminar"),
      {
        headers
      }
    ).subscribe(s => {rows = s});
    return rows;
  }
}
