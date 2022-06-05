export interface usuario {
    ID_USUARIO: string;
    ID_PUESTO: number;
    ID_ROL: number;
    USUARIO: string;
    CONTRASENA: string;
    NOMBRE_PERSONA: string;
    APELLIDO_PERSONA: string;
    CORREO_ELECTRONICO: string;
    TELEFONO: string;
    RTN: string;
    SUELDO:number,
    IMG_USUARIO: string;
    PREGUNTA: string;
    RESPUESTA: string;
    GENERO: string;
    FECHA_VENCIMIENTO: string;
    CREADO_POR: number;
    MODIFICADO_POR: number;
    ESTADO: number;
}

export interface AuthResponse {
  "session_code"?: string;
}
