import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../models/Servicio';

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
      "URI/some-path/"+servicioNombre,
      {
        headers
      }
    ).subscribe(s => data = s);
    
    return data;
  }

  postServicio(servicio : Servicio) : Servicio {
    let data! : Servicio;

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    this.httpClient.post<Servicio>(
      "URI/some-path/post",
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
