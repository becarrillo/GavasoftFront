import { Agendamiento } from "./Agendamiento";

export interface Factura {
    "facturaId": number,
    "clienteTipoDocumento": string,
    "clienteNumDocumento": string,
    "clienteNombreCompleto": string,
    "agendamientosList": Agendamiento[] | null
    "estadoDePago": string,
    "metodoDePago": string
}