export interface Agendamiento {
    "agendamientoId"?: string,
    "fechaHora": string,
    "servicioId": string,
    "usuarioClienteId"?: number,
    "estado"?: string,
    "carritoDeComprasId"?: string | null
}