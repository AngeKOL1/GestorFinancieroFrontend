export interface UsuarioDTO {
    contrasena: string,
    confirmPassword: string,
    correo: string,
    nombre: string,
    apellido: string
}

// mantener compatibilidad con el nombre anterior si alguna parte del proyecto
// importa `CrearUsuarioDTO`. Reexportamos como alias de tipo.
export type CrearUsuarioDTO = UsuarioDTO;