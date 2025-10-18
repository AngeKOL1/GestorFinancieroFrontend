import axios from "axios";
import type { UsuarioDTO } from "../DTO/CrearUsuarioDTO";

const URL= "http://localhost:3030/usuarios/registro"

export const RegistrarUsuario = async(usuario: UsuarioDTO)=>{
    try{
        const response= await axios.post(URL, usuario)
        return response.data
    }catch(error){
        console.log("Error al crear usuario", error)
        throw error;
    }
}