export interface Empleado {
    "usuario_id"?: number | null,
    "apellidos": string,
    "nombre": string,
    "email": string,
    "password": string,
    "rol"?: string | null,
    "tel"?: string | null,
    "tipo_documento": string,
    "num_documento": string,
    "url_fotografia": string,
    "fecha_entrada": string,
    "fecha_retiro"?: string | null
}