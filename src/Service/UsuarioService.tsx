import axios from "axios";
import type { UsuarioDTO } from "../DTO/CrearUsuarioDTO";
import { URL_UTLIZADA } from "../AppConstants/AppURL";

const URL = `${URL_UTLIZADA}/usuarios/registro`

export const RegistrarUsuario = async(usuario: UsuarioDTO)=>{
    try{
        const response= await axios.post(URL, usuario)
        return response.data
    }catch(error){
        console.log("Error al crear usuario", error)
        throw error;
    }
}