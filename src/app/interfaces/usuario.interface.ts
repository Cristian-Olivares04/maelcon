export interface usuario {
    _id: string;
    nombreUsuario: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    fechaNacimiento: string;
    fotoPerfil: string;
    preguntaSeguridad: string;
    respuestaSeguridad: string;
    imagen: string;
    estado: number;
}

export interface AuthResponse {
  "session_code"?: string;
}
