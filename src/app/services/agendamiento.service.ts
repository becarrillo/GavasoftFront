import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamiento } from '../models/Agendamiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamientoService {

  constructor(private http : HttpClient) { }

  getOneByFechaHora(fechaHora : string) {
    return this.http.get<Agendamiento>(
      "https://usuario-app-production.up.railway.app/v1/usuarios/clientes/menu-cliente/agendamientos/consultar-por-fecha-hora/"+fechaHora,
    );
  }

  save(agendamiento : Agendamiento) : Observable<Agendamiento> {
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Vary", "Origin");

    return this.http.post<Agendamiento>(
      "https://usuario-app-production.up.railway.app/v1/usuarios/empleados/menu-administrador/admin-agenda/agendar-servicio/nuevo",
      agendamiento,
      {
        headers
      }
    );
  }
}
