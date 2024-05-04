export interface Ingreso {
    facturaId : number,
    fechaHoraDelServicio : string,
    servicioId : string,
    servicioNombre : string,
    servicioPrecio : number,
    servicioImgUrl : string,
    clienteTipoDocumento : string,
    clienteNumDocumento : number,
    fechaDeConsulta : string
}